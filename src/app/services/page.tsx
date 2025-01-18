import ServiceCustomPage from "@/components/custompages/service"
import type { Metadata } from 'next'
 
// For your services page
export const metadata: Metadata = {
  title: 'Services | Ali Burhan - Full-Stack & AI Engineer',
  description: 'Discover the professional services offered by Ali Burhan, a full-stack developer and AI engineer specializing in Generative AI (GenAI), NLP, machine learning, and cutting-edge technologies like LangChain and Hugging Face.',
  keywords: 'software engineer, full-stack developer, AI engineer, Generative AI, GenAI, NLP, machine learning, React, Next.js, LangChain, Hugging Face, Python, AI solutions',
  openGraph: {
    title: 'Services | Ali Burhan - Full-Stack & AI Engineer',
    description: 'Explore the range of services offered by Ali Burhan, including full-stack development, machine learning, NLP, Generative AI (GenAI), and AI-powered solutions.',
    url: 'https://aliburhan.vercel.app/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Ali Burhan - Full-Stack & AI Engineer',
    description: 'Explore the range of services offered by Ali Burhan, specializing in full-stack development, Generative AI, and advanced machine learning techniques.',
   
  },
};

const Page = () => {

  return (
  <ServiceCustomPage/>    
  )
}

export default Page