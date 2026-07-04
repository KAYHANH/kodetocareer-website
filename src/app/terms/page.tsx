import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 relative overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-heading font-bold text-white mb-8">Terms of Service</h1>

        <div className="prose prose-invert text-text-secondary space-y-6 text-sm leading-relaxed">
          <p>Last updated: July 1, 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">1. Agreement to Terms</h2>
            <p>By registering on or using the KodeToCareer website, tools, or dashboard, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">2. Eligibility & Account</h2>
            <p>You must be at least 16 years old to create an account. You are responsible for keeping your login credentials secure and for all activities that occur under your account.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">3. Course Registration & Payments</h2>
            <p>Registration fees are payable in advance or via approved installment plans. Course credentials, materials, and learning resources are for personal, non-commercial use only. Unauthorized sharing of logins or curriculum materials will result in account termination without refund.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">4. Placement Assistance Policy</h2>
            <p>While our placement cell works diligently to prepare you and schedule interviews with partner hiring entities, successful placement depends on student interview performance, assignment submission, project standards, and attendance requirements. Enrollment does not guarantee employment.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">5. Limitation of Liability</h2>
            <p>KodeToCareer shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our platform or educational services.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">6. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be posted here with an updated revision date. Continued usage constitutes acceptance of new terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
