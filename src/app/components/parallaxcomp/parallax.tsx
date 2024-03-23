// components/ParallaxSection.js
'use client'
import { Parallax } from 'react-parallax';

const ParallaxSection = () => {
  return (
    <Parallax bgImage="/parallaxbg.jpg" strength={600}>
      <div className='text-white gap-5 h-[100vh] flex-col flex justify-center items-center px-20'>
        <h2 className='text-5xl font-semibold font-mono'>I combine my knowledge in business with design &amp; marketing to bring your brand to life.</h2>
        <button className='px-16 py-4 bg-gradient-to-r from-teal-300 via-blue-800 to-blue-900 hover:scale-110 rounded-lg transition-all duration-300 '>Get Start With Me</button>
      </div>
    </Parallax>
  );
};

export default ParallaxSection;
