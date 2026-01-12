import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'From Rice to AirPods: Data Scale - Guided Reading | LLMachete',
  description: 'Article-style exploration of data scale with navigation aids and progress tracking. Guided journey from bytes to zettabytes.',
  openGraph: {
    title: 'From Rice to AirPods: Data Scale - Guided',
    description: 'Guided reading experience with navigation and progress tracking',
    url: 'https://stories.llmachete.com/article',
    siteName: 'LLMachete',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Rice to AirPods: Data Scale - Guided',
    description: 'Article-style journey with top navigation and progress tracking',
  }
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
