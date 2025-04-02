import Image from 'next/image'
import React from 'react'

const Technology = () => {

  const tech = [     
    {       
      id: 1,       
      title: "Web Development",       
      description: "Crafting modern, responsive, and high-performing websites with the latest technologies like React, Next.js, and Tailwind CSS. From static pages to dynamic web applications, I ensure optimal user experience and performance.",       
      imgurl: "/tech1.svg"     
    },     
    {       
      id: 2,       
      title: "App Development",       
      description: "Building seamless and intuitive mobile applications for both Android and iOS platforms. Using frameworks like React Native and Flutter, I create cross-platform apps that deliver a smooth user experience.",       
      imgurl: "/tech2.svg"     
    },     
    {       
      id: 3,       
      title: "Data Science",       
      description: "Transforming raw data into meaningful insights using machine learning, deep learning, and NLP techniques. I specialize in data preprocessing, model training, and deploying AI-powered applications.",       
      imgurl: "/tech3.svg"     
    }   
  ];
  
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