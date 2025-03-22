import React from 'react'
import CoursesForm from './form'
import FetchCourses from './courses'

export default function CoursesController() {
  return (
    <div>
      <CoursesForm/>
      <FetchCourses/>
    </div>
  )
}
