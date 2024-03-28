'use client'
import Image from 'next/image'
const Page = () => {

  return (
    <div className='pt-16'>
      <div className="h-[50vh] lg:py-24 lg:px-44 md:py-20 md:px-20 sm:px-10 px-10 py-10">
        <h1 className="text-5xl">Explore Services.</h1>
        <h1 className="text-5xl">Tailored for your needs.</h1>
      </div>
      <div className="h-[100vh] bg-blue-600 flex items-center justify-center sticky top-0 z-0 lg:px-40 lg:gap-10 md:px-20 md:gap-5 gap-5 sm:flex-col md:flex-row sm:px-5 px-5 sm:py-5 flex-col py-5">
        <div className="md:flex-1 flex justify-center">
          <div className='flex flex-col gap-5'>
            <Image src={'/tech2.svg'} height={80} width={80} />
            <h1 className='text-white lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold'>Web Design &amp; Development</h1>
            <p className='lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-blue-400'>Create web design that positions your brand strongly</p>
          </div>
        </div>
        <div className="md:flex-1">
          <div className=' flex flex-col gap-3 justify-end'>
          <p className='text-white tracking-tight'>I specialize in crafting responsive and visually appealing websites that not only attract visitors but also drive conversions. I leverage the latest technologies to ensure your website stands out in the digital landscape. Work with a web developer in Kuwait that reflects your brand identity and helps you achieve your business objectives.</p>
          <button className='w-full py-4 bg-white text-blue-700 font-semibold'>VIEW PROJECTS</button>
          </div>
        </div>
      </div>
      <div className="h-[100vh] bg-green-500 z-[1] sticky flex items-center top-0 lg:px-40 lg:gap-10 md:px-20 md:gap-5 gap-5 sm:flex-col md:flex-row sm:px-5 px-5 sm:py-5 flex-col py-5">

        <div className="md:flex-1 flex justify-center">
          <div className='flex flex-col gap-5'>
            <Image src={'/tech3.svg'} height={80} width={80} />
            <h1 className='text-white lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold'>App Design &amp; Development</h1>
            <p className='lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-green-300'>Develop designs that move your business forward</p>
          </div>
        </div>
        <div className="md:flex-1">
          <div className=' flex flex-col gap-3 justify-end'>
          <p className='text-white tracking-tight'>I specialize in crafting responsive and visually appealing websites that not only attract visitors but also drive conversions. I leverage the latest technologies to ensure your website stands out in the digital landscape. Work with a web developer in Kuwait that reflects your brand identity and helps you achieve your business objectives.</p>
          <button className='w-full py-4 bg-white text-green-700 font-semibold'>VIEW PROJECTS</button>
          </div>
        </div>
      </div>
      <div className="h-[100vh] bg-orange-500 z-[1] sticky top-0 flex items-center lg:px-40 lg:gap-10 md:px-20 md:gap-5 gap-5 sm:flex-col md:flex-row sm:px-5 px-5 sm:py-5 flex-col py-5">
      
        <div className="md:flex-1 flex justify-center">
          <div className='flex flex-col gap-5'>
            <Image src={'/tech1.svg'} height={80} width={80} />
            <h1 className='text-white lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold'>Machine Learning &amp; Data Science</h1>
            <p className='lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-orange-300'>Develop designs that move your business forward</p>
          </div>
        </div>
        <div className="md:flex-1">
          <div className=' flex flex-col gap-3 justify-end'>
          <p className='text-white tracking-tight'>I specialize in crafting responsive and visually appealing websites that not only attract visitors but also drive conversions. I leverage the latest technologies to ensure your website stands out in the digital landscape. Work with a web developer in Kuwait that reflects your brand identity and helps you achieve your business objectives.</p>
          <button className='w-full py-4 bg-white text-orange-700 font-semibold'>VIEW PROJECTS</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Page