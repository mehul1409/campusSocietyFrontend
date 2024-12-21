import React, {useEffect} from 'react'

const Spocdashboard = () => {

  useEffect(() => {
    const token = localStorage.getItem('spocauthorize');

    if (!token) {
      window.location.href = '/';
    }
  },[])
  return (
    <div>
      spoc dashboard
    </div>
  )
}

export default Spocdashboard
