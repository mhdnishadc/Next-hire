"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'


function Header() {

  const path = usePathname();
  useEffect(()=>{
   console.log(path)
  },[]);
  return (
    <div className='flex p-4 justify-between bg-secondary shadow-md'>
    <Image src={'/logo.svg'} height={160} width={100} alt='logo'/>
    <ul className='hidden md:flex gap-6'>
      <li className={`hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&&'text-purple-800 font-bold'}`}>Dashboard</li>
      <li  className={`hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&&'text-primary font-bold'}`}>Questions</li>
      <li  className={`hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}>Upgrade</li>
      <li  className={`hover:text-purple-800 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how'&&'text-primary font-bold'}`}>How its Work</li>
    </ul>
  <UserButton/>
    </div>
  )
}

export default Header