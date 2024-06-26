import React from 'react'

type ButtonProps = {
  children: string
}

const Button = (props: ButtonProps) => {
  return (
    <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">{props.children}</button>
  )
}

export default Button