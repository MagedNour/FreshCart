import React from 'react'

export default function SpinnerLoadingScreen() {
  return (
    <div className='min-h-screen fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center z-40'>
      <i className='fas fa-spinner fa-spin fa-8x text-green-300'></i>
    </div>
  )
}
