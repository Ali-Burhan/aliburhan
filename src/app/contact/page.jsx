'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Page = () => {
    const {register,handleSubmit} = useForm()
    const [response,setResponse] = useState(false)
    const [loading,setloading] = useState(false)
    const [error,setError] = useState(false)
    //submit handler
    async function onSubmitHandler(data) {
        const {name,phone,company,website,service,message,email} = data
        setloading(true)
        try {
            const res = await fetch('/api/contact',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,phone,company,website,service,message,email
                })
            })

            const data = await res.json()
            if(data.status == 200){
                    setResponse(true)
                    setloading(false)
            }
            else{
                setError(true)
            }
            setloading(false)
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <>
    { loading &&
        <div className='fixed flex-col gap-5 top-0 h-[100vh] z-50 bg-transparent  bg-gray-600 flex justify-center items-center w-[100vw]'>
    <div class="loader">
  <div class="loader_cube loader_cube--color"></div>
   <div class="loader_cube loader_cube--glowing"></div>
</div>
<h1 className='bg-gradient-to-l from-orange-500 to-green-500 p-2 rounded text-white'>
   sending Messages
</h1>
    </div>
    }
    <div className='h-fit bg-[#f4f4f4] pt-16 lg:px-28 md:px-14 sm:px-8 px-8'>
        <div className='flex py-14 gap-9 sm:flex-col flex-col md:flex-row'>
            <div className='lg:basis-1/2 md:basis-1/3 relative flex flex-col gap-6'>
            <h1 className='text-5xl tracking-tight'>Get in Touch</h1>
            <p className='tracking-tight'>Get in touch with me through this form. Fill out all the necessary details so I can help you out in the best way possible.</p>
            { response && <p className='bg-gradient-to-l from-orange-500 to-green-500 items-center text-white p-2 rounded flex justify-between'>Thanks For Your Mesasge! <span className='text-xl rotate-45 cursor-pointer' onClick={()=>setResponse(false)}>+</span></p>}
            { error && <p className='bg-red-500 items-center text-white p-2 rounded flex justify-between'>Some Error Occured 🙁 <span className='text-xl rotate-45 cursor-pointer' onClick={()=>setError(false)}>+</span></p>}
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className='lg:basis-1/2 md:basis-2/3 flex flex-col gap-4'>

                {/* input flex div */}
                <div className='flex gap-2 flex-1'>
                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Name*</p>
                        <input type="text" className='border-2 p-2 outline-none w-full' {...register('name')} />
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Email Address*</p>
                        <input type="email" className='border-2 p-2 outline-none w-full' {...register('email')} />
                    </div>
                 
                </div>
                <div className='flex gap-2 flex-1'>

                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Phone Number*</p>
                        <input type="text" className='border-2 p-2 outline-none w-full' {...register('phone')} />
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Company*</p>
                        <input type="text" className='border-2 p-2 outline-none w-full' {...register('company')}/>
                    </div>
                 
                </div>
                <div className='flex gap-2 flex-1'>

                    <div className='flex flex-col gap-1 flex-1'>

                        <p className='text-xs'>Website (if any)</p>
                        <input type="text" className='border-2 p-2 outline-none w-full' {...register('website')}/>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <p className='text-xs'>Service Requierd</p>
                        <select name="" id=""  className='border-2 p-[10px] outline-none w-full' {...register('service')}>
                            <option value="Web">Web Development</option>
                            <option value="App">App Development</option>
                        </select>
                    </div>
                 
                </div>
                <div className='flex flex-col gap-2'>

                        <p className='text-xs'>Message</p>
                        <textarea name="message" id="message" cols="30" className='w-full outline-none p-2 border-2' rows="7" placeholder='Example Text' {...register('message')}></textarea>
                </div>
            <button className='font-semibold tracking-tight text-sm cursor-pointer flex gap-2 outline-none items-center group hover:underline transition-all duration-300'>Submit Form <svg width="30" height="30" className='group-hover:ml-2 transition-all' fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
  <path d="m9 18 6-6-6-6"></path>
</svg></button>
            </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Page