'use client';

import type { ReactNode } from 'react';

interface MarkdownProps {
  children: string | null | undefined;
  className?: string;
}

function parseInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let cursor = 0;
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={match.index} className="font-bold">{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      parts.push(<em key={match.index}>{match[2]}</em>);
    } else if (match[3] !== undefined) {
      parts.push(
        <code key={match.index} className="bg-black/10 rounded px-1 font-mono text-xs">
          {match[3]}
        </code>,
      );
    }
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  if (parts.length === 0) return null;
  if (parts.length === 1 && typeof parts[0] === 'string') return parts[0];
  return <>{parts}</>;
}

export default function Markdown({ children, className }: MarkdownProps) {
  if (!children) return null;

  const paragraphs = children.split(/\n{2,}/);

  const rendered = paragraphs.map((block, pi) => {
    const lines = block.split('\n');

    const isOl = lines.every((l) => /^\d+\.\s/.test(l.trim()) || l.trim() === '');
    const isUl = lines.every((l) => /^[-*]\s/.test(l.trim()) || l.trim() === '');

    if (isOl && lines.some((l) => /^\d+\.\s/.test(l.trim()))) {
      return (
        <ol key={pi} className="list-decimal pl-4 mb-2 space-y-1">
          {lines
            .filter((l) => /^\d+\.\s/.test(l.trim()))
            .map((l, i) => (
              <li key={i}>{parseInline(l.replace(/^\d+\.\s/, ''))}</li>
            ))}
        </ol>
      );
    }

    if (isUl && lines.some((l) => /^[-*]\s/.test(l.trim()))) {
      return (
        <ul key={pi} className="list-disc pl-4 mb-2 space-y-1">
          {lines
            .filter((l) => /^[-*]\s/.test(l.trim()))
            .map((l, i) => (
              <li key={i}>{parseInline(l.replace(/^[-*]\s/, ''))}</li>
            ))}
        </ul>
      );
    }

    const inlineContent = lines.map((line, li) => (
      <span key={li}>
        {parseInline(line)}
        {li < lines.length - 1 && <br />}
      </span>
    ));

    return (
      <p key={pi} className="mb-2 last:mb-0">
        {inlineContent}
      </p>
    );
  });

  return <div className={className}>{rendered}</div>;
}
