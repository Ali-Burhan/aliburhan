import Image from 'next/image'
const Page = () => {
  return (
    <div className='pt-16'>
        {/* first about section */}
        <div className='flex my-16 h-[70vh] flex-col md:flex-row sm:flex-col'>
            <div className='flex-1 items-center justify-center flex'>
                <div className='flex flex-col gap-4 lg:px-24 md:px-10 sm:px-10 px-10' data-aos="fade-right">
                <h1 className='lg:text-5xl md:text-3xl font-bold text-3xl sm:text-3xl'>My Story</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatum maiores, veniam deleniti vitae dolor nulla eos nemo inventore voluptas voluptates recusandae officia consectetur iusto modi, nobis minus aperiam earum.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatum maiores, veniam deleniti vitae dolor nulla eos nemo inventore voluptas voluptates recusandae officia consectetur iusto modi, nobis minus aperiam earum.</p>
                </div>
            </div>
            <div className='flex-1 sm:hidden md:block hidden'>
                <Image src={'/ali.jpg'} height={1000} width={1000} className='w-full h-full'/>
            </div>
        </div>
        {/* first section end */}
        {/* second skills section start */}
        <div className='flex gap-4 justify-center py-5 flex-wrap'>
            <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-orange-500 cursor-pointer transition-all duration-200'>

                    <div className='rounded-full bg-orange-500 p-2 border border-white'>
                        <Image src={'/tech1.svg'} height={50} width={50} className='rounded-full'/>
                    </div>
                    <p className='font-bold  group-hover:text-white'>
                        Machine Learning
                    </p>
                    <p className='group-hover:text-white'>Lorem ipsum dolor sit amet co adipisicing elit. Similique, neq</p>
            </div>
            <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-blue-500 cursor-pointer transition-all duration-200'>


                    <div className='rounded-full bg-blue-500 p-2 border border-white'>
                        <Image src={'/tech2.svg'} height={50} width={50} className='rounded-full'/>
                    </div>
                    <p className='font-bold  group-hover:text-white'>
                        Web Development
                    </p>
                    <p className='group-hover:text-white'>Lorem ipsum dolor sit amet co adipisicing elit. Similique, neq</p>
            </div>
            <div className='flex flex-col gap-2 w-64 items-center py-4 border px-3 group hover:bg-green-500 cursor-pointer transition-all duration-200'>



                    <div className='rounded-full bg-green-500 p-2 border border-white'>
                        <Image src={'/tech3.svg'} height={40} width={40} className='rounded-full'/>
                    </div>
                    <p className='font-bold  group-hover:text-white'>
                        App Development
                    </p>
                    <p className='group-hover:text-white'>Lorem ipsum dolor sit amet co adipisicing elit. Similique, neq</p>
            </div>
        </div>
    </div>
  )
}

export default Page