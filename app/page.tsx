import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';

export const metadata: Metadata = {
  title: 'From Rice to AirPods: Data, Transformation, and the Skills That Matter | LLMachete',
  description: 'A five-part series connecting data fundamentals to 260 years of industrial transformation. Understand the 4th Industrial Revolution through economic history, not product demos.',
  openGraph: {
    title: 'From Rice to AirPods | LLMachete',
    description: 'A five-part series on data, transformation, and the skills that matter. Economic history meets AI literacy.',
    url: 'https://stories.llmachete.com',
    siteName: 'LLMachete',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Rice to AirPods | LLMachete',
    description: 'A five-part series connecting data fundamentals to industrial transformation',
  }
};

export default function Home() {
  return <LandingPage />;
}
