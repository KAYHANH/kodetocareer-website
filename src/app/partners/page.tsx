import Link from 'next/link';
import { Handshake, Building2, Users } from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background pt-10 pb-24 relative overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 border border-white/[0.04]">
          <Handshake className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-white mb-4">Corporate Partnerships</h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto mb-12">
          Partner with KodeToCareer to source pre-vetted developer talent, design corporate training cohorts, or sponsor student hackathons.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/[0.08] hover:border-primary/20 transition-all duration-300">
            <Building2 className="w-6 h-6 text-accent mb-4" />
            <h3 className="font-heading font-bold text-white mb-2">Talent Acquisition</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Access our curated talent pool. Hire graduates trained in full-stack, data science, and AI workflows.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/[0.08] hover:border-primary/20 transition-all duration-300">
            <Users className="w-6 h-6 text-secondary mb-4" />
            <h3 className="font-heading font-bold text-white mb-2">Corporate Training</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Upskill your current workforce with modern, customized engineering and business intelligence tracks.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-95 transition-opacity"
        >
          Contact Partner Relations
        </Link>
      </div>
    </div>
  );
}
