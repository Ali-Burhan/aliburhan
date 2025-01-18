'use client'
import Image from 'next/image'
import Link from 'next/link'
const ServiceCustomPage = () => {

  return (
    <div className='pt-16'>
      <div className="h-[50vh] lg:py-24 lg:px-44 md:py-20 md:px-20 sm:px-10 px-10 py-10">
        <h1 className="text-5xl" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000">Explore Services.</h1>
        <h1 className="text-5xl"  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000">Tailored for your needs.</h1>
      </div>
      <div className="h-[100vh] bg-blue-600 flex items-center justify-center sticky top-0 z-0 lg:px-40 lg:gap-10 md:px-20 md:gap-5 gap-5 sm:flex-col md:flex-row sm:px-5 px-5 sm:py-5 flex-col py-5">
        <div className="md:flex-1 flex justify-center">
          <div className='flex flex-col gap-5'>
            <Image src={'/tech2.svg'} height={80} width={80} alt='tech2 image'/>
            <h1 className='text-white lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold'>Web Design &amp; Development</h1>
            <p className='lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-blue-400'>Create web design that positions your brand strongly</p>
          </div>
        </div>
        <div className="md:flex-1">
          <div className=' flex flex-col gap-3 justify-end'>
          <p className='text-white tracking-tight'>As a dedicated freelance web developer, I offer a range of web development services tailored to meet your unique needs. With expertise in front-end and back-end development, I create responsive, user-friendly websites that are not only visually appealing but also optimized for performance. Whether you need a simple landing ServiceCustompage or a complex web application, I work closely with you to bring your vision to life, ensuring quality, functionality, and a seamless user experience. Let&apos;s collaborate to build a powerful online presence for your business.</p>
          <Link href={'/projects'} className='w-full py-4 grid place-items-center bg-white text-blue-700 font-semibold'>VIEW PROJECTS</Link>
          </div>
        </div>
      </div>
      <div className="h-[100vh] bg-green-500 z-[1] sticky flex items-center top-0 lg:px-40 lg:gap-10 md:px-20 md:gap-5 gap-5 sm:flex-col md:flex-row sm:px-5 px-5 sm:py-5 flex-col py-5">

        <div className="md:flex-1 flex justify-center">
          <div className='flex flex-col gap-5'>
            <Image src={'/tech3.svg'} height={80} width={80} alt='tech3 image'/>
            <h1 className='text-white lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold'>App Design &amp; Development</h1>
            <p className='lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-green-300'>Develop designs that move your business forward</p>
          </div>
        </div>
        <div className="md:flex-1">
          <div className=' flex flex-col gap-3 justify-end'>
          <p className='text-white tracking-tight'>As a freelance app developer, I provide professional app development services to help bring your ideas to life. Specializing in both iOS and Android platforms, I create custom, user-friendly mobile applications that are tailored to your specific needs. From concept to deployment, I ensure a smooth development process, focusing on functionality, performance, and a great user experience. Whether you need a simple utility app or a complex, feature-rich application, I am here to deliver high-quality solutions that align with your business goals. Let&apos;s work together to build the perfect app for your needs.</p>
          <Link href={'/projects'} className='w-full py-4 grid place-items-center bg-white text-green-700 font-semibold'>VIEW PROJECTS</Link>
          </div>
        </div>
      </div>
      <div className="h-[100vh] bg-orange-500 z-[1] sticky top-0 flex items-center lg:px-40 lg:gap-10 md:px-20 md:gap-5 gap-5 sm:flex-col md:flex-row sm:px-5 px-5 sm:py-5 flex-col py-5">
      
        <div className="md:flex-1 flex justify-center">
          <div className='flex flex-col gap-5'>
            <Image src={'/tech1.svg'} height={80} width={80} alt='Tech 1 alt'/>
            <h1 className='text-white lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold'>Machine Learning &amp; Data Science</h1>
            <p className='lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-orange-300'>Develop designs that move your business forward</p>
          </div>
        </div>
        <div className="md:flex-1">
          <div className=' flex flex-col gap-3 justify-end'>
          <p className='text-white tracking-tight'>As a freelance machine learning and AI specialist, I offer tailored solutions to help businesses harness the power of artificial intelligence. With expertise in data analysis, predictive modeling, and natural language processing, I create custom AI models and machine learning algorithms that drive insights and automation. Whether you need to build a recommendation system, automate a process, or leverage data for strategic decision-making, I am here to provide cutting-edge solutions that meet your specific requirements. Let&apos;s work together to unlock the potential of AI and machine learning for your business.</p>
          <Link href={'/projects'} className='w-full py-4 grid place-items-center bg-white text-orange-700 font-semibold'>VIEW PROJECTS</Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ServiceCustomPage