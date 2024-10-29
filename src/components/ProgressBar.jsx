import React from 'react'

export default function ProgressBar({progress, bgColor, progressHeight='h-7'}) {
  return (
    <div className={`${progressHeight} w-full bg-beige_100 relative flex items-center rounded-md`}>
      <div style={{backgroundColor:bgColor, width: parseInt(progress) > 100 ?  "100%" : progress }} className={`absolute left-0 h-4/5 rounded-md`}> </div>
    </div>
  )
}
