import React from 'react'

function Button({
    children,
    type='button',
    classes='',
    ...props

}) {
  return (
    <button type={type} className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer ${classes}`} {...props}>{children}</button>
  )
}

export default Button
