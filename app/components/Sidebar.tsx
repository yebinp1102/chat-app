import React from 'react'

const Sidebar = async ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full'>{children}</div>
  )
}

export default Sidebar