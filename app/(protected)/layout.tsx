import React from 'react'
import { Navbar } from './_components/navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-y-10">
      <Navbar />
      {children}
    </div>
  )
}

export default ProtectedLayout; 
