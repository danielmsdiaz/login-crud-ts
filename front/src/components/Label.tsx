import React from 'react'

const Label = ({children}: {children:string}) => {
  return (
    <label className="block mt-10 text-sm font-medium text-gray-900 dark:text-white">{children}</label>
  )
}

export default Label