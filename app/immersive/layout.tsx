import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'From Rice to AirPods: Data Scale - Immersive Experience | LLMachete',
  description: 'Full-screen scrollytelling experience exploring data scale from bytes to zettabytes. Cinematic journey through humanity\'s data transformation.',
  openGraph: {
    title: 'From Rice to AirPods: Data Scale - Immersive',
    description: 'Cinematic full-screen experience of the data revolution',
    url: 'https://stories.llmachete.com/immersive',
    siteName: 'LLMachete',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Rice to AirPods: Data Scale - Immersive',
    description: 'Full-screen scrollytelling journey from kilobytes to zettabytes',
  }
};

export default function ImmersiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
