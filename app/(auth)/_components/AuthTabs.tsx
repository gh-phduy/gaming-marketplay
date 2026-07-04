'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AuthTabsProps {
  className?: string
}

export default function AuthTabs({ className = '' }: AuthTabsProps) {
  const pathname = usePathname()
  
  return (
    <div className={`flex bg-[#2b3545] mx-5 rounded-md overflow-hidden relative ${className}`}>
      {/* Background slider với animation */}
      <div 
        className={`absolute top-0 w-[220px] h-[40px] bg-[#354051] transition-transform duration-300 ease-in-out ${
          pathname === '/signup' ? 'translate-x-[220px]' : 'translate-x-0'
        }`}
      />
      
      {/* Login Tab */}
      <Link 
        href="/login"
        className={`relative z-10 text-[16px] w-[210px] h-[40px] p-2 flex justify-center items-center transition-all duration-300 ${
          pathname === '/login' 
            ? 'text-[#F6F6F6] font-semibold' 
            : 'text-[#C0C3C9] hover:text-[#E5E7EB]'
        }`}
      >
        LOGIN
      </Link>
      
      {/* Signup Tab */}
      <Link 
        href="/signup"
        className={`relative z-10 text-[16px] w-[210px] h-[40px] p-2 flex justify-center items-center transition-all duration-300 ${
          pathname === '/signup' 
            ? 'text-[#F6F6F6] font-semibold' 
            : 'text-[#C0C3C9] hover:text-[#E5E7EB]'
        }`}
      >
        SIGNUP
      </Link>
    </div>
  )
}