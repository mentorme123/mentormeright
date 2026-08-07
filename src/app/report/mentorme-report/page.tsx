import { Suspense } from 'react';
import MentorMeReport from '../mentorme-report';

export default function ReportPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams?.userId;
  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 font-medium">User ID is required to view the report.</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <MentorMeReport userId={userId} />
    </Suspense>
  );
}
