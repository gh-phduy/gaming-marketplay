import Image from 'next/image'
import AuthTabs from "./components/AuthTabs"
import { AppProviders } from '@/providers/AppProviders'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProviders>
      <div className='bg-black flex justify-center items-center min-h-screen' >
        <div className="bg-[#212937] w-fit p-10 flex flex-col gap-y-5 justify-center items-center">
        <Image
          className='self-start'
          src="/Difmark-logo.png"
          alt="Logo"
          width={150}
          height={35} 
        />
        
        <AuthTabs />
        
        {children}
      </div>
      </div>
    </AppProviders>
  )
}