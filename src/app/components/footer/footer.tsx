import React from 'react'

const Footer = () => {
  return (
    <div>
<hr />
    <div className='flex justify-between items-center lg:px-28 md:px-10 sm:px-5 px-5 flex-col md:flex-row py-5 gap-3'>
        <div className='flex flex-col gap-2 flex-1'>
            <h1 className='text-5xl font-extrabold'>Ali Burhan</h1>
            <p className='text-xs text-gray-500 font-semibold'>{new Date().getFullYear()} &copy; All Rights Reserved to Ali Burhan</p>
        </div>
        <div className='flex-1'>
            <p className='tracking-tight font-sans'>Ali Burhan is a Pakistan-based web designer and Nextjs/Reactjs developer who has been working as a graphic designer for 4 years, building social brands, company profiles, and presentations.</p>
        </div>
    </div>
    <hr />
    </div>
  )
}

export default Footer