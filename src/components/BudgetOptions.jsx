import React from 'react'

export default function BudgetOptions({deleteBudget,editBudget}) {
  return (
    <div className='absolute p-5 bg-white right-0 z-10 w-[150px] text-sm shadow-xl'>
      <div className='border-b pb-2 mb-2 cursor-pointer' onClick={editBudget}>
        Edit Budget
      </div>
      <div className='text-red-600 cursor-pointer' onClick={deleteBudget}>
        Delete Budget
      </div>
    </div>
  )
}
