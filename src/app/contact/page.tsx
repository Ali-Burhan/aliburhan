import ContactCustomPage from '@/components/custompages/contact'
import type { Metadata } from 'next'
 
// For your about page
export const metadata: Metadata = {
  title: 'Contact | Ali Burhan - Full-Stack & AI Engineer',
  description: 'Get in touch with Ali Burhan, a full-stack developer and AI engineer. Send a message through the contact form, email me, or reach me by phone to discuss your projects or inquiries.',
  openGraph: {
    title: 'Contact | Ali Burhan - Full-Stack & AI Engineer',
    description: 'Contact Ali Burhan for your development and AI solutions. Use the contact form, email, or phone to connect with me directly.',
    url: 'https://aliburhan.vercel.app/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Ali Burhan - Full-Stack & AI Engineer',
    description: 'Reach out to Ali Burhan for full-stack development, AI solutions, and more. Use the contact form, email, or phone to get in touch.',
  },
  keywords: [
    'contact Ali Burhan',
    'full-stack developer contact',
    'AI engineer contact',
    'Generative AI expert',
    'machine learning expert',
    'NLP specialist',
    'send message to Ali Burhan',
    'email Ali Burhan',
    'call Ali Burhan',
    'contact form for Ali Burhan',
    'LangChain expert contact',
    'Hugging Face expert contact',
    'software engineer contact',
    'get in touch with Ali Burhan',
    'reach out to Ali Burhan',
    'AI-powered solutions contact',
    'developer for hire',
    'AI solutions inquiry',
    'full-stack and AI solutions contact',
    'connect with Ali Burhan',
  ]

};

const Page = () => {

  return (
    <ContactCustomPage/>
  )
}

export default Page