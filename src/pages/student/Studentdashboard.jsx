import React, { useEffect } from 'react'

const Studentdashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem('studentauthorize');

    if (!token) {
      window.location.href = '/';
    }
  },[])
  return (
    <div>
      student dashboard
    </div>
  )
}

export default Studentdashboard
