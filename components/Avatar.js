import React from 'react'
import Image from 'next/image'

const Avatar = ({children}) => {
  return (
    <div className='flex gap-2 hover:border border-black rounded-lg px-2 py-2'>
       <Image src="/useravatarLogo.png" width={20} height={10} alt="user" />
       {children}
    </div>
  )
}

export default Avatar
