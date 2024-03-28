import Image from 'next/image'
const Page = () => {
  return (
    <div className='h-fit bg-[#f4f4f4] pt-16 lg:px-28 md:px-14 sm:px-8 px-8'>
        <div className='flex py-14 gap-9 sm:flex-col flex-col md:flex-row'>
            <div className='lg:basis-1/2 md:basis-1/3 relative flex flex-col gap-6'>
            <h1 className='text-5xl tracking-tight'>Get in Touch</h1>
            <p className='tracking-tight'>Get in touch with me through this form. Fill out all the necessary details so I can help you out in the best way possible.</p>
            </div>
            <div className='lg:basis-1/2 md:basis-2/3 flex flex-col gap-4'>

                {/* input flex div */}
                <div className='flex gap-2 flex-1'>
                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Name*</p>
                        <input type="text" className='border-2 p-2 w-full' />
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Email Address*</p>
                        <input type="text" className='border-2 p-2 w-full' />
                    </div>
                 
                </div>
                <div className='flex gap-2 flex-1'>

                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Phone Number*</p>
                        <input type="text" className='border-2 p-2 w-full' />
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Company*</p>
                        <input type="text" className='border-2 p-2 w-full' />
                    </div>
                 
                </div>
                <div className='flex gap-2 flex-1'>

                    <div className='flex flex-col gap-1 flex-1'>

                        <p className='text-xs'>Website (if any)</p>
                        <input type="text" className='border-2 p-2 w-full' />
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Service Requierd</p>
                        <select name="" id=""  className='border-2 p-[10px] w-full' >
                            <option value="">Web Development</option>
                            <option value="">App Development</option>
                        </select>
                    </div>
                 
                </div>
                <div className='flex flex-col gap-2'>

                        <p className='text-xs'>Message</p>
                        <textarea name="message" id="message" cols="30" className='w-full p-2 border-2' rows="7" placeholder='Example Text'></textarea>
                </div>
            <p className='font-semibold tracking-tight text-sm cursor-pointer flex gap-2 items-center group hover:underline transition-all duration-300'>Submit Form <svg width="30" height="30" className='group-hover:ml-2 transition-all' fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
  <path d="m9 18 6-6-6-6"></path>
</svg></p>
            </div>
        </div>
    </div>
  )
}

export default Page