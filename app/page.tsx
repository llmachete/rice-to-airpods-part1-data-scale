import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'From Rice to AirPods: Data Scale - Choose Your Journey | LLMachete',
  description: 'Choose your reading experience: Immersive scrollytelling or guided article. Explore data scale from kilobytes to zettabytes through rice grain metaphors.',
  openGraph: {
    title: 'From Rice to AirPods: Data Scale - Interactive Story',
    description: 'Two ways to explore humanity\'s data transformation: immersive experience or guided reading',
    url: 'https://stories.llmachete.com',
    siteName: 'LLMachete',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Rice to AirPods: Data Scale',
    description: 'Explore data scale through two unique reading experiences',
  }
};

export default function Home() {
  return <LandingPage />;
}
