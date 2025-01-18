import HomePage from '@/components/custompages/home';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: ' Burhan | Software Engineer Portfolio',
  description: 'Explore the professional portfolio of Ali Burhan, a software engineer specializing in full-stack development, AI, machine learning,Agentic AI, NLP, LLM, Langchain, Hugging Face and more.',
  keywords: 'software engineer, full-stack developer, React, Next.js, Python, machine learning, AI, portfolio',
  openGraph: {
    title: 'Software Engineer Portfolio | Ali Burhan',
    description: 'Discover my software engineering portfolio showcasing projects in React, Next.js, machine learning, and AI.',
    url: 'https://aliburhan.vercel.app/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Engineer Portfolio | Ali Burhan',
    description: 'Explore my software engineering portfolio showcasing projects in React, Next.js, machine learning, and AI.',
  },
};
 
export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
