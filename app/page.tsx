import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'From Rice to AirPods: Choose Your Journey | LLMachete',
  description: 'Choose your reading experience: Immersive scrollytelling or guided article. Explore data scale from kilobytes to zettabytes through rice grain metaphors.',
  openGraph: {
    title: 'From Rice to AirPods - Interactive Data Story',
    description: 'Two ways to explore humanity\'s data transformation: immersive experience or guided reading',
    url: 'https://stories.llmachete.com',
    siteName: 'LLMachete Stories',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Rice to AirPods - Choose Your Journey',
    description: 'Explore data scale through two unique reading experiences',
  }
};

export default function Home() {
  return <LandingPage />;
}
