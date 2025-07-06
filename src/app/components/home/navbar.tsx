'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handler() {
      const windowScroll = window.scrollY
      if (windowScroll > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (toggleNav && !event.target.closest('.navbar-container')) {
        setToggleNav(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [toggleNav])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path:string) => pathname === path

  return (
    <div className={`navbar-container fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg' 
        : 'bg-transparent'
    }`}>
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={'/'} className="group">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                  AB
                </div>
                <span className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                  Ali Burhan
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Chat Bot CTA */}
            <Link
              href={'/chatbot'}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
            >
              Chat With Bot
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setToggleNav(!toggleNav)}
              className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 group"
              aria-label="Toggle navigation"
            >
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                toggleNav ? 'rotate-45 translate-y-2' : ''
              }`} />
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                toggleNav ? 'opacity-0' : ''
              }`} />
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                toggleNav ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ${
        toggleNav 
          ? 'opacity-100 visible translate-y-0' 
          : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className="bg-slate-900/98 backdrop-blur-lg border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setToggleNav(false)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: toggleNav ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                  }}
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive(item.path) ? 'bg-indigo-400' : 'bg-gray-600 group-hover:bg-white'
                  }`} />
                  <span className="font-medium text-lg">{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile Chat Bot CTA */}
              <Link
                href={'/chatbot'}
                onClick={() => setToggleNav(false)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-center"
                style={{ 
                  animationDelay: `${navItems.length * 100}ms`,
                  animation: toggleNav ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                }}
              >
                Chat With Bot
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {toggleNav && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setToggleNav(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Navbar