import { QAResponse } from '@/app/types/qa'
import React from 'react'




const Card = (data: QAResponse) => {
  console.log(">>",data)
  return (
    <div className='outline rounded'>
      {data.question}
    </div>
  )
}

export default Card