import React from 'react'
import type { Metadata } from 'next'
import ExperienceCustomPage from '@/components/custompages/experience';
 
// For your services page
export const metadata: Metadata = {
    title: 'Experience | Ali Burhan - Full-Stack & AI Engineer',
    description: 'Explore the professional experience of Ali Burhan, a full-stack developer and AI engineer with expertise in Generative AI, machine learning, NLP, and leading technologies like LangChain and Hugging Face.',
    keywords: 'software engineer, full-stack developer, AI engineer, Generative AI, GenAI, machine learning, NLP, React, Next.js, LangChain, Hugging Face, Python, career, professional experience',
    openGraph: {
      title: 'Experience | Ali Burhan - Full-Stack & AI Engineer',
      description: 'Discover the professional journey of Ali Burhan, including his contributions in full-stack development, AI engineering, and innovative projects in Generative AI and machine learning.',
      url: 'https://aliburhan.vercel.app/experience',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Experience | Ali Burhan - Full-Stack & AI Engineer',
      description: 'Dive into the professional experience of Ali Burhan, showcasing work in full-stack development, AI engineering, and cutting-edge technologies like Generative AI and NLP.',
    },
  };
  

const Experience = () => {
  return (
    <div className=''>
      <ExperienceCustomPage/>
    </div>
  )
}

export default Experience
