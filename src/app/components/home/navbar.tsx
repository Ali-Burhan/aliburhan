'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [toggleNav,setTogglenav] = useState(false)
  const [scrolled,setScrolled] = useState(false)

  useEffect(()=>{
     function handler(){
      const windowscroll = window.scrollY
      if(windowscroll > 10){
        setScrolled(true)
      }
      else{
        setScrolled(false)
      }
    }
    window.addEventListener('scroll',handler)
    
  },[])
  return (
    <div className={`fixed top-0 left-0 right-0 z-10 "text-black bg-white transition-all duration-500`}>
      {/* main navbar         */}
      <div className="flex justify-between sm:mt-6 mt-6 md:mt-0 md:px-28 sm:px-10 px-10  items-center h-16">

      <div className="font-extrabold text-2xl leading-none translate-x-0">Ali Burhan</div>
      <div className="sm:block block md:hidden cursor-pointer" onClick={()=>setTogglenav(!toggleNav)}>
        <p className={`border w-8 ${toggleNav && "rotate-45 translate-y-[3px] transition-all"}`}></p>
        <p className={`border w-8 mt-2 ${toggleNav && "-rotate-45 -translate-y-[7px] transition-all"}`}></p>
      </div>
      <div className="hidden sm:hidden md:flex">
        <div className="flex gap-4 items-center">
          <Link href={'/'} className="text-xs leading-none hover:underline">
            Service
          </Link>
          <Link href={'/'} className="text-xs leading-none hover:underline">
            About
          </Link>
          <Link href={'/projects'} className="text-xs leading-none  hover:underline">
            Projects
          </Link>
          <Link href={'/'} className="text-xs leading-none pr-5  hover:underline">
            Insights
          </Link>
          <Link href={'/'} className="text-xs leading-none border-l border-black px-5 py-1 font-semibold  hover:underline">
            Start Project 
          </Link>
        </div>
      </div>
      </div>
      <div className={`absolute ${!toggleNav?"-top-10 transition-all":"top-24 transition-all"} bg-white text-black p-1 sm:block block md:hidden`}>
  <div className="flex gap-4 justify-center w-screen items-center">
          <Link href={'/'} className="text-xs leading-none hover:underline">
            Service
          </Link>
          <Link href={'/'} className="text-xs leading-none hover:underline">
            About
          </Link>
          <Link href={'/projects'} className="text-xs leading-none  hover:underline">
            Projects
          </Link>
          <Link href={'/'} className="text-xs leading-none  hover:underline">
            Insights
          </Link>
          <Link href={'/'} className="text-xs leading-none font-semibold  hover:underline">
            Start Project 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar