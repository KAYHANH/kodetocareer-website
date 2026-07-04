import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-10 pb-24 relative overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-heading font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert text-text-secondary space-y-6 text-sm leading-relaxed">
          <p>Last updated: July 1, 2026</p>
          
          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">1. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when registering for our courses, utilizing the AI Career Assistant, subscribing to newsletters, or contacting us. This includes your name, email, phone number, education credentials, resume details, and billing information.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">2. How We Use Your Information</h2>
            <p>We use the collected data to provide and maintain our services, customize your learning roadmap, analyze your resume skills, facilitate placements with corporate partners, process payments, and communicate course updates.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">3. Data Sharing & Third Parties</h2>
            <p>We do not sell your personal data. We may share information with recruitment partners and corporate hiring entities solely to facilitate student placements and internships, or with service vendors (e.g., payment processors, hosting services) under strict confidentiality agreements.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">4. Cookies and Tracking</h2>
            <p>We use cookies to analyze web traffic, remember login preferences, and personalize advertisements. You can configure your browser to reject cookies, though some features of the dashboard may not function correctly.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">5. Security</h2>
            <p>We implement industry-standard encryption, firewalls, and access controls to secure your data. However, no electronic storage or transmission method is 100% secure.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white">6. Contact Us</h2>
            <p>If you have any questions or concerns regarding this policy, email us at <a href="mailto:privacy@kodetocareer.com" className="text-primary hover:underline">privacy@kodetocareer.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
