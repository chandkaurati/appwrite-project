import React from 'react'

function Button({
    title = "Button",
    bgColor = "blue",
    textColor = "white",
    width =  "150px",
    className = "",
    ...props 
}) {
  return (
    <button className={`px-4, py-2 rounded-lg ${bgColor},
     ${textColor}, ${className}`} 
     {...props}
    >
        {title}
    </button>
  )
}

export default Button
