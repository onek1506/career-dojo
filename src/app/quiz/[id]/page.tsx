'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Quiz is integrated into the lesson page — redirect there
export default function QuizRedirect() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/lesson/${params.id}`);
  }, [params.id, router]);

  return (
    <div className="min-h-screen bg-[var(--duo-bg)] flex items-center justify-center">
      <div className="text-[var(--duo-text-muted)]">Redirecting...</div>
    </div>
  );
}
