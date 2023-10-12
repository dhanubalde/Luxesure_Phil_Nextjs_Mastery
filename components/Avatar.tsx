"use client"

import Image from 'next/image'

const Avatar = () => {
  return (
      <Image
          className='rounded-full items-center'
          src="/images/placeholder.jpg"
          alt='user'
          width='25'
          height='25'
      />
  )
}

export default Avatar