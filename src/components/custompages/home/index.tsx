'use client'
import ParallaxSection from "@/app/components/parallaxcomp/parallax";
import Techbelow from "@/app/components/techbelow/techbelow";
import Technology from "@/app/components/technology/tech";
import Page from "@/app/projects/page";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
export default function Home() {
  return (
  <>
  <div className=" relative h-[100vh]" >
    {/* Background Video */}
    <video autoPlay loop muted className="absolute h-full w-full inset-0 object-cover -z-10 opacity-90">
      <source src="./mainvideo2.mp4" type="video/mp4"/>
      could not
    </video>

    {/* main content */}

    <div className="flex items-center h-full sm:flex-col flex-col md:flex-row z-10 text-white ">

      <div className="flex justify-center p-10 items-center flex-col flex-1 mx-5 rounded-xl md:hover:opacity-65 transition-all duration-300">
        <div className="">
      <h1 className="lg:text-4xl leading-10 font-bold md:text-2xl sm:text-xl text-xl ">
      <TypeAnimation
      className=""
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'I am Designer',
        1500, // wait 1s before replacing "Mice" with "Hamsters"
        'I am Developer',
        1000,
        'I am Data Scientist',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
      </h1>
      <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-3xl tracking-wide leading-relaxed">That listen to your problem</h1>
      
  {/* Contact Details */}
  <div className='mt-2 hidden lg:flex flex-row gap-2'>
    {/* Email */}
    <a
      href='mailto:aliburhandev@gmail.com'
      className='flex items-center gap-3 p-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition transform duration-200 shadow-md'
    >
      📧 <span className='text-lg font-medium'>aliburhandev@gmail.com</span>
    </a>
    {/* Phone */}
    <a
      href='tel:+923161499488'
      className='flex items-center gap-3 p-1 rounded-lg bg-gradient-to-r from-green-500 to-yellow-500 hover:scale-105 transition transform duration-200 shadow-md'
    >
      📞 <span className='text-lg font-medium'>+92 316 1499488</span>
    </a>
    {/* GitHub */}
    <a
      href='https://github.com/Ali-Burhan'
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center gap-3 p-1 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 hover:scale-105 transition transform duration-200 shadow-md'
    >
      🌐 <span className='text-lg font-medium'>github.com/Ali-Burhan</span>
    </a>
    {/* LinkedIn */}
    <a
      href='https://www.linkedin.com/in/ali-burhan-9076b42b6/'
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center gap-3 p-1 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-600 hover:scale-105 transition transform duration-200 shadow-md'
    >
      💼 <span className='text-lg font-medium'>linkedin.com/in/ali-burhan</span>
    </a>
  </div>
      <p className="mt-3 md:text-xl ">I am a Pakistan-Based Graphic Designer &amp; Nextjs Developer Who Works <br /> With Startups &amp; Corporations On Web Design, Branding, And Presentations</p>
      <div className="mt-5"><Link href={'/projects'} className="flex gap-4 items-center hover:pl-48 transition-all duration-500 cursor-pointer">Start Project <svg className="" width="30" height="30" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
  <path d="M21 12H3"></path>
  <path d="m15 6 6 6-6 6"></path>
</svg></Link></div>
      </div>
        </div>
    </div>
  </div>
  <Page/>
  <ParallaxSection/>
  <Technology/>
  <Techbelow/>
  </>
  );
}
