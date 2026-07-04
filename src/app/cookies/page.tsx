import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background pt-10 pb-24 relative overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-heading font-bold text-white mb-8">Cookie Policy</h1>

        <div className="prose prose-invert text-text-secondary space-y-6 text-sm leading-relaxed">
          <p>Last updated: July 1, 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">1. What Are Cookies</h2>
            <p>Cookies are small text files stored on your computer or mobile device when you visit website pages. They help website servers recall your authentication states, preferred settings, and browsing behavior to make your experience smoother.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">2. How We Use Cookies</h2>
            <p>We use essential cookies to maintain student login states and dashboard preferences. We also use analytics cookies (e.g., Google Analytics) to study user metrics, session durations, page performance, and optimize our learning resources.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">3. Third Party Cookies</h2>
            <p>Some pages may feature third-party pixels or widgets (like YouTube videos or payment processing scripts) which load their own cookies. We do not control these cookies and recommend checking the respective third-party privacy statements.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">4. Managing Cookies</h2>
            <p>You can adjust your browser settings to warn you about cookies or block them entirely. However, blocking essential cookies will prevent you from logging into the student or admin dashboard.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
