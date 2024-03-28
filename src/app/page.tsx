'use client'
import ParallaxSection from "./components/parallaxcomp/parallax";
import Techbelow from "./components/techbelow/techbelow";
import Technology from "./components/technology/tech";
import Page from "./projects/page";
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
      <h1 className="text-4xl leading-10 font-bold ">
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
      <p className="mt-3 md:text-xl ">I am a Pakistan-Based Graphic Designer & Nextjs Developer Who Works <br /> With Startups &amp; Corporations On Web Design, Branding, And Presentations</p>
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
