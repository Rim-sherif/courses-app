import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

export default function Loader() {
  return (
    
    <InfinitySpin
      visible={true}
      width="200"
      color="#410445"
      ariaLabel="infinity-spin-loading"
    />
  )
}
