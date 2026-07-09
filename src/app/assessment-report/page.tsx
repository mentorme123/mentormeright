import ReportClient from "./client";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function AssessmentReportPage({
  searchParams,
}: {
  searchParams: { userId?: string };
}) {
  const userId = searchParams?.userId;
  if (!userId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 font-medium">User ID is required</p>
        </div>
      </div>
    );
  }
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-600">Loading...</p></div>}>
      <ReportClient userId={userId} />
    </Suspense>
  );
}
