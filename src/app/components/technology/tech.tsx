import Image from 'next/image'
import React from 'react'

const Technology = () => {

  const tech = [
    {
      id:1,
      title:"Web Development",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse voluptatibus, officia nostrum culpa veniam nobis exercitationem quod id tempora placeat.",
      imgurl:"/tech1.svg"
    },
    {
      id:2,
      title:"App Development",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse voluptatibus, officia nostrum culpa veniam nobis exercitationem quod id tempora placeat.",
      imgurl:"/tech2.svg"
    },
    {
      id:3,
      title:"Data Scientist",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse voluptatibus, officia nostrum culpa veniam nobis exercitationem quod id tempora placeat.",
      imgurl:"/tech3.svg"
    },
  ]

  return (
    <div className='lg:px-44 md:px-20 sm:px-10 px-10 py-16'>
      <div className='flex gap-4 sm:flex-col flex-col md:flex-row justify-center items-center'>
      {tech.map((ele,index)=>(
        <div key={index} className='flex flex-col gap-4 lg:w-1/3 md:w-1/2 sm:w-full w-full' data-aos="zoom-in">
            <Image src={ele.imgurl} width={70} height={70} alt='bg'/>
            <h1 className='font-semibold text-xl tracking-tighter'>{ele.title}</h1>
            <p>{ele.description}</p>
            <p className='font-semibold text-lg'>Learn More</p>
            <hr className='md:hidden sm:block block'/>
            </div>
            ))}
            </div>
    </div>
  )
}

export default Technology