export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-4xl md:text-5xl font-black text-brand-blue mb-4">Terms & Conditions</h1>
        <p className="text-slate-500 mb-10 font-medium">Last Updated: April 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the MentorMe platform (&quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
            <p>
              MentorMe provides users with access to a rich collection of resources, including psychometric assessments, career counseling video sessions, and educational program information. You understand and agree that the Service is provided &quot;AS-IS&quot; and that MentorMe assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Registration Obligations</h2>
            <p className="mb-3">In consideration of your use of the Service, you represent that you are of legal age to form a binding contract and are not a person barred from receiving services under the laws of applicable jurisdictions. You also agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide true, accurate, current and complete information about yourself as prompted by the Service&apos;s registration form.</li>
              <li>Maintain and promptly update the Registration Data to keep it true, accurate, current and complete.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Member Account, Password, and Security</h2>
            <p>
              You will receive a password and account designation upon completing the Service&apos;s registration process. You are responsible for maintaining the confidentiality of the password and account, and are fully responsible for all activities that occur under your password or account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Modifications to Service</h2>
            <p>
              MentorMe reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that MentorMe shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Disclaimer of Warranties</h2>
            <p>
              The career advice, assessment results, and counseling provided by MentorMe are intended for guidance and educational purposes only. They do not constitute professional psychiatric or legal advice. MentorMe makes no warranty that the service will meet your requirements or that the service will be uninterrupted, timely, secure, or error-free.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
