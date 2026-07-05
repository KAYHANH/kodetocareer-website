import type { Metadata } from 'next';
import AdmissionsClient from './AdmissionsClient';

export const metadata: Metadata = {
  title: 'Admissions & University Degree Services | KodeToCareer',
  description: 'Apply for UGC-DEB approved distance MBA, BBA, B.Tech degree programs and professional engineering cohorts under direct admission counselor support.',
  alternates: {
    canonical: 'https://kodetocareer.com/career-services/admissions',
  }
};

export default function Page() {
  return <AdmissionsClient />;
}
