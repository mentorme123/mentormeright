export default function RefundPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl md:text-5xl font-black text-brand-orange mb-4">Refund & Cancellation Policy</h1>
        <p className="text-slate-500 mb-10 font-medium">Last Updated: April 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. General Policy Overview</h2>
            <p>
              At MentorMe, we strive to ensure that our students and institutional partners receive the highest quality of service. However, we understand that circumstances may arise where a refund or cancellation is necessary. This policy outlines the conditions under which refunds are provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Psychometric Assessments</h2>
            <p className="mb-3">
              Due to the digital and immediate nature of our psychometric assessment generation:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Once an assessment has been started or completed, the fee is <strong>100% non-refundable</strong>.</li>
              <li>If you have purchased an assessment but have not yet initiated it, you may request a full refund within <strong>7 days</strong> of purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. 1-on-1 Career Counseling Sessions</h2>
            <p className="mb-3">
              For scheduled video consultations with our expert career counselors:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cancellations:</strong> You may cancel or reschedule your session up to <strong>24 hours</strong> before the scheduled time without any penalty.</li>
              <li><strong>Late Cancellations/No-Shows:</strong> If you cancel within 24 hours of the session or fail to attend, you will be charged the full amount, and no refund will be issued.</li>
              <li><strong>Counselor Unavailability:</strong> In the rare event that our counselor is unable to attend the session, you will be offered a priority reschedule or a 100% full refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Corporate & Institutional Programs</h2>
            <p>
              For our B2B partners purchasing bulk access or corporate training programs, refund and cancellation terms are governed strictly by the individual Service Level Agreement (SLA) signed during onboarding. Please refer to your specific contract for details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. How to Request a Refund</h2>
            <p>
              To request a refund, please email <strong>admin@mentormeright.in</strong> with your registered email address, transaction ID, and the reason for the refund request. Our support team will process eligible refunds within 5-7 business days. Approved refunds will be credited back to the original payment method.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
