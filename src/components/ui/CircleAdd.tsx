import React from 'react'
import { Plus } from 'react-feather'

const CircleAdd = () => {
  return (
    <div className="flex justify-center items-center h-14 w-14 rounded-[50%] bg-primary-500 text-white font-semibold text-4xl shadow-md">
      <Plus size={36} />
    </div>
  )
}

export default CircleAdd
