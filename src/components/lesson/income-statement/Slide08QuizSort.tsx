'use client';

import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import MarcusNote from '../MarcusNote';
import { sortQuizCorrectOrder, sortQuizInitialOrder } from './data';
import { priorStreakFor, type SlideProps } from './types';

type CardCheck = { ok: boolean; correctIdx: number; currentIdx: number };

export default function Slide08QuizSort({ onAnswer, onCanProceed, onNext, quizResults }: SlideProps) {
  const [order, setOrder] = useState<string[]>(sortQuizInitialOrder);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [cardChecks, setCardChecks] = useState<Record<string, CardCheck>>({});

  const allCorrect = order.every((label, i) => label === sortQuizCorrectOrder[i]);
  const priorStreak = priorStreakFor('q1', quizResults);

  useEffect(() => {
    onCanProceed?.(checked && allCorrect);
  }, [checked, allCorrect, onCanProceed]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (checked && allCorrect) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setOrder((prev) => {
      const oldIndex = prev.indexOf(active.id as string);
      const newIndex = prev.indexOf(over.id as string);
      return arrayMove(prev, oldIndex, newIndex);
    });
    if (checked) {
      // user is retrying after a check — clear marks
      setChecked(false);
      setCardChecks({});
    }
  };

  const handleCheck = () => {
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    const map: Record<string, CardCheck> = {};
    order.forEach((label, i) => {
      const correctIdx = sortQuizCorrectOrder.indexOf(label as (typeof sortQuizCorrectOrder)[number]);
      map[label] = { ok: label === sortQuizCorrectOrder[i], correctIdx, currentIdx: i };
    });
    setCardChecks(map);
    setChecked(true);
    if (allCorrect) {
      onAnswer?.('q1', { correct: true, attempts: nextAttempts });
    } else {
      onAnswer?.('q1', { correct: false, attempts: nextAttempts });
    }
  };

  const handleProceed = () => onNext?.();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          Frage 1 / 4 · +10 XP
        </span>
      </div>

      <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
        Bringe die GuV-Positionen in die richtige Reihenfolge.
      </h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-2">
            {order.map((label) => (
              <SortableCard key={label} id={label} check={checked ? cardChecks[label] : undefined} disabled={checked && allCorrect} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <AnimatePresence>
        {checked && allCorrect && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <MarcusNote body={<>Sauber. Diese Reihenfolge musst du im Schlaf können.</>} />
            <StreakPill count={priorStreak + 1} />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={checked && allCorrect ? handleProceed : handleCheck}
        className="w-full py-4 rounded-lg bg-is-accent text-is-bg-primary font-semibold font-[family-name:var(--font-is-sans)] hover:bg-is-accent-hover transition-all duration-200"
      >
        {checked && allCorrect ? 'Nächste Frage' : 'Antwort prüfen'}
      </button>
    </div>
  );
}

function SortableCard({
  id,
  check,
  disabled,
}: {
  id: string;
  check?: CardCheck;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const stateClass = check
    ? check.ok
      ? 'border-is-success bg-is-success-muted'
      : 'border-is-error bg-is-error-muted'
    : isDragging
      ? 'border-is-accent opacity-50'
      : 'border-is-bg-border';

  const moveDir = check && !check.ok ? Math.sign(check.correctIdx - check.currentIdx) : 0;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={[
        'flex items-center gap-3 bg-is-bg-secondary border rounded-lg p-3 sm:p-4',
        'transition-colors duration-200 select-none touch-none',
        stateClass,
      ].join(' ')}
      {...attributes}
    >
      <button
        type="button"
        {...listeners}
        className="text-is-text-muted hover:text-is-text-primary cursor-grab active:cursor-grabbing p-1 -ml-1"
        aria-label={`${id} verschieben`}
      >
        <GripVertical size={16} />
      </button>
      <span className="font-[family-name:var(--font-is-mono)] text-sm sm:text-base text-is-text-primary flex-1">
        {id}
      </span>
      {moveDir !== 0 && (
        <span className="text-is-error" aria-hidden>
          {moveDir < 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        </span>
      )}
    </li>
  );
}

function StreakPill({ count }: { count: number }) {
  return (
    <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
      <span aria-hidden className="text-is-accent">🔥</span>
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
        {count} in Folge richtig
      </span>
    </div>
  );
}
