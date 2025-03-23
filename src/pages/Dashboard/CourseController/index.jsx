import React from 'react'
import { Outlet } from 'react-router-dom'

const CoursesController = () => {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  )
}

export default CoursesController
