import React from 'react'

export default function ProgressBar({progress, bgColor}) {
  return (
    <div className='h-7 w-full bg-beige_100 relative'>
      <div style={{backgroundColor:bgColor, width: progress}} className={`absolute left-0 h-full`}> </div>
    </div>
  )
}
