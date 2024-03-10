import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <h2>Looking for something?</h2>
      <h6>This is not web page you are looking for.</h6>
      <h6>Go back to <Link to={'/'}>HOMEPAGE</Link></h6>
    </div>
  )
}

export default PageNotFound
