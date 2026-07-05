import type { Metadata } from 'next';
import PlacementsClient from './PlacementsClient';

export const metadata: Metadata = {
  title: 'Placement Assistance Cell & Corporate Partners | KodeToCareer',
  description: 'Learn how our placement cell links pre-vetted developer portfolios to over 500 hiring partner companies, coordinating direct technical interviews.',
  alternates: {
    canonical: 'https://kodetocareer.com/career-services/placements',
  }
};

export default function Page() {
  return <PlacementsClient />;
}
