import AboutCustomPage from '@/components/custompages/about'
import type { Metadata } from 'next'
 
// For your about page
export const metadata: Metadata = {
  title: 'About | Ali Burhan - Full-Stack & AI Engineer',
  description: 'Learn about Ali Burhan, a passionate full-stack developer and AI engineer specializing in machine learning, Generative AI, NLP, and cutting-edge technologies like LangChain and Hugging Face.',
  openGraph: {
    title: 'About | Ali Burhan - Full-Stack & AI Engineer',
    description: 'Get to know Ali Burhan, a full-stack developer and AI engineer, with expertise in machine learning, NLP, and Generative AI. Explore my journey and projects.',
    url: 'https://aliburhan.vercel.app/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Ali Burhan - Full-Stack & AI Engineer',
    description: 'Discover the story of Ali Burhan, a full-stack developer and AI engineer with expertise in Generative AI, NLP, and machine learning. Learn more about my journey and expertise.',
  },
  keywords: [
    'about Ali Burhan',
    'Ali Burhan portfolio',
    'full-stack developer profile',
    'AI engineer biography',
    'Generative AI expert profile',
    'machine learning specialist bio',
    'NLP expert story',
    'LangChain expert background',
    'Hugging Face specialist details',
    'Ali Burhan career journey',
    'software engineer expertise',
    'technology innovator Ali Burhan',
    'Ali Burhan professional experience',
    'developer and AI engineer bio',
    'full-stack and AI developer story',
    'AI-powered solutions creator',
    'meet Ali Burhan',
    'Ali Burhan skills and expertise',
    'Ali Burhan achievements',
    'AI and full-stack development expert',
  ]  
};

const Page = () => {
  return (
    <AboutCustomPage/>
  )
}

export default Page