'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

const Techbelow = () => {
    const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });

    const mouseHandler = (e:any) => {
      // Update the position of the point based on mouse movement
      setPointPosition({ x: e.clientX, y: e.clientY });
      console.log(pointPosition);
      
    };

  return (
    <Link href={'/'} >
    <div className='h-[100vh] bg-[#F4F4F4] relative lg:px-44 md:px-20 sm:px-5 px-5 py-20 hover:bg-blue-600 group'  onMouseMove={mouseHandler}>
        <div style={{height:"80px", width:'80px',background:'white',position:'absolute',left:pointPosition.x,top:pointPosition.y,borderRadius:'50%',display:pointPosition.y==0?"none": 'flex',justifyContent:'center',alignItems:'center'}}>Start</div>
            <div className='bg-white h-full w-full grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 group-hover:bg-blue-500'>
                        <div className='flex gap-4 flex-col p-10 justify-center items-center group-hover:text-white'>
                            <h1 className='text-4xl font-semibold tracking-widest'>Work With A Designer That Listens To Your Problems</h1>
                            <p className='text-lg tracking-tight'>
  I prioritize understanding your needs, ensuring every design decision aligns with your vision. Let’s collaborate to craft solutions that truly resonate with your goals.
</p>

                            <p className='font-semibold tracking-tighter hover:underline'>Start Projects</p>
                        </div>
                        <div className='group-hover:my-5 sm:hidden hidden md:block group-hover:scale-105 transition-all duration-200' data-aos="zoom-in">
                            <Image src={'/arrow.svg'} width={300} height={300} className='w-full h-full' alt='arrow pic'/>
                        </div>
            </div>
    </div>
    </Link>
  )
}

export default Techbelow