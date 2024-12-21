import React, { useEffect } from 'react'

const Studentdashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem('coordinatorauthorize');

    if (!token) {
      window.location.href = '/';
    }
  },[])
  return (
    <div>
      coordinator dashboard
    </div>
  )
}

export default Studentdashboard
