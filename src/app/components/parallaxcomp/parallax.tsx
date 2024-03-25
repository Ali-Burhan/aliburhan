// components/ParallaxSection.js
'use client'
import { Parallax,Background } from 'react-parallax';

const ParallaxSection = () => {
  return (
    <Parallax  strength={500} bgImage='/parallaxbg.jpg'>
      <div className='text-white gap-5 h-[90vh] flex-col flex justify-center items-center px-20'>
        <h2 className='md:text-5xl sm:text-2xl text-2xl font-semibold font-mono'>I combine my knowledge in business with design &amp; marketing to bring your brand to life.</h2>
        <button className='md:px-16 md:py-4 sm:px-8 px-8 sm:py-3 py-3 bg-gradient-to-r from-cyan-300 via-blue-500 to-blue-700 hover:scale-110 rounded-lg transition-all duration-300 '>Get Start With Me</button>
      </div>
    </Parallax>
  );
};

export default ParallaxSection;
