import React from 'react'

export default function LoaderBtn() {
  return (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
    </div>
  )
}
