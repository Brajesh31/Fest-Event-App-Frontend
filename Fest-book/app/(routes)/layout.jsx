import React from 'react'
import Dashboard from './page'
function DashboardLayout({ childern }) {
  return (
    <div>
      <div className='relative md:ml-64'>
        <Dashboard
        />
      </div>
      <div className='md:ml-64'>
        {childern}
      </div>
    </div>
  )
}

export default DashboardLayout