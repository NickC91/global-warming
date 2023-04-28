import React from 'react'
import { ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid'

const Button = ({ text, active }) => {
  const activeClass = active ? 'bg-red-100 text-red-500' : 'text-gray-400 hover:bg-red-100 hover:text-red-500';

  return (
    <div className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${activeClass}`}>
      <div className="mr-2">
        {!active ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronDoubleRightIcon className="h-5 w-5" />}
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Button