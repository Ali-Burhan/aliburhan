// import Image from 'next/image'
// const AboutCustomPage = () => {
//   return (
//     <div className='pt-16'>
//         {/* first about section */}
//         <div className='flex my-16 h-[70vh] flex-col md:flex-row sm:flex-col'>
//             <div className='flex-1 items-center justify-center flex'>
//                 <div className='flex flex-col gap-4 lg:px-24 md:px-10 sm:px-10 px-10' data-aos="fade-right">
//                 <h1 className='lg:text-5xl md:text-3xl font-bold text-3xl sm:text-3xl'>My Story</h1>
//                 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatum maiores, veniam deleniti vitae dolor nulla eos nemo inventore voluptas voluptates recusandae officia consectetur iusto modi, nobis minus aperiam earum.</p>
//                 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatum maiores, veniam deleniti vitae dolor nulla eos nemo inventore voluptas voluptates recusandae officia consectetur iusto modi, nobis minus aperiam earum.</p>
//                 </div>
//             </div>
//             <div className='flex-1 sm:hidden md:block hidden'>
//                 <Image src={'/ali.jpg'} height={1000} width={1000} className='w-full h-full' alt="alternate pic"/>
//             </div>
//         </div>
//         {/* first section end */}
//         {/* second skills section start */}
//         <div className='flex gap-4 justify-center py-5 flex-wrap'>
//             <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-orange-500 cursor-pointer transition-all duration-200'>

//                     <div className='rounded-full bg-orange-500 p-2 border border-white'>
//                         <Image src={'/tech1.svg'} height={50} width={50} className='rounded-full' alt="alternate pic"/>
//                     </div>
//                     <p className='font-bold  group-hover:text-white'>
//                         Machine Learning
//                     </p>
//                     <p className='group-hover:text-white'>Lorem ipsum dolor sit amet co adipisicing elit. Similique, neq</p>
//             </div>
//             <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-blue-500 cursor-pointer transition-all duration-200'>


//                     <div className='rounded-full bg-blue-500 p-2 border border-white'>
//                         <Image src={'/tech2.svg'} height={50} width={50} className='rounded-full' alt="alternate pic"/>
//                     </div>
//                     <p className='font-bold  group-hover:text-white'>
//                         Web Development
//                     </p>
//                     <p className='group-hover:text-white'>Lorem ipsum dolor sit amet co adipisicing elit. Similique, neq</p>
//             </div>
//             <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-green-500 cursor-pointer transition-all duration-200'>



//                     <div className='rounded-full bg-green-500 p-2 border border-white'>
//                         <Image src={'/tech3.svg'} height={40} width={40} className='rounded-full' alt="alternate pic"/>
//                     </div>
//                     <p className='font-bold  group-hover:text-white'>
//                         App Development
//                     </p>
//                     <p className='group-hover:text-white'>Lorem ipsum dolor sit amet co adipisicing elit. Similique, neq</p>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AboutCustomPage

import Image from 'next/image';

const AboutCustomPage = () => {
  return (
    <div className='pt-16'>
        {/* first about section */}
        <section className='flex my-16 h-[70vh] flex-col md:flex-row sm:flex-col'>
            <div className='flex-1 items-center justify-center flex'>
                <div className='flex flex-col gap-4 lg:px-24 md:px-10 sm:px-10 px-10' data-aos="fade-right">
                    <h1 className='lg:text-5xl md:text-3xl font-bold text-3xl sm:text-3xl'>My Story</h1>
                    <p>
                      I am Ali Burhan, a full-stack developer and AI engineer with a strong passion for building scalable web applications and creating innovative AI solutions. Over the years, I’ve developed expertise in Generative AI, Machine Learning, Natural Language Processing, and more. 
                    </p>
                    <p>
                      My journey started with web development, where I quickly grew fond of frameworks like React and Next.js, and later delved into Python and its machine learning libraries. Today, I specialize in developing Agentic AI systems and utilizing technologies such as LangChain and Hugging Face to create cutting-edge AI models. 
                    </p>
                    <p>
                      I am always exploring new challenges and improving my skills to stay at the forefront of the industry, whether through continuous learning or contributing to real-world projects.
                    </p>
                </div>
            </div>
            <div className='flex-1 sm:hidden md:block hidden'>
                <Image 
                  src='/ali.jpg' 
                  height={1000} 
                  width={1000} 
                  className='w-full h-full rounded-lg' 
                  alt="Ali Burhan"
                />
            </div>
        </section>
        {/* first section end */}

        {/* second skills section start */}
        <section className='flex gap-4 justify-center py-5 flex-wrap'>
            <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-orange-500 cursor-pointer transition-all duration-200'>
                <div className='rounded-full bg-orange-500 p-2 border border-white'>
                    <Image 
                      src='/tech1.svg' 
                      height={50} 
                      width={50} 
                      className='rounded-full' 
                      alt="Machine Learning" 
                    />
                </div>
                <h2 className='font-bold group-hover:text-white'>Machine Learning</h2>
                <p className='group-hover:text-white'>
                    I build and deploy machine learning models with a focus on data-driven decision-making and automation.
                </p>
            </div>
            <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-blue-500 cursor-pointer transition-all duration-200'>
                <div className='rounded-full bg-blue-500 p-2 border border-white'>
                    <Image 
                      src='/tech2.svg' 
                      height={50} 
                      width={50} 
                      className='rounded-full' 
                      alt="Web Development" 
                    />
                </div>
                <h2 className='font-bold group-hover:text-white'>Web Development</h2>
                <p className='group-hover:text-white'>
                    Experienced in creating responsive, user-friendly web applications using React, Next.js, and Node.js.
                </p>
            </div>
            <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-green-500 cursor-pointer transition-all duration-200'>
                <div className='rounded-full bg-green-500 p-2 border border-white'>
                    <Image 
                      src='/tech3.svg' 
                      height={50} 
                      width={50} 
                      className='rounded-full' 
                      alt="App Development" 
                    />
                </div>
                <h2 className='font-bold group-hover:text-white'>App Development</h2>
                <p className='group-hover:text-white'>
                    Expertise in building robust mobile applications with cross-platform frameworks like React Native.
                </p>
            </div>
        </section>
        {/* second section end */}
    </div>
  );
}

export default AboutCustomPage;
