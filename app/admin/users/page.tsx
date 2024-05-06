'use client'
import React, { FC } from 'react'
import AdminSidebar from '../../../app/components/Admin/AdminSidebar'
import Heading from '../../../app/utils/Heading'
import DashboardHeader from '../../../app/components/Admin/DashboardHeader'
import AllUsers from '@/app/components/Admin/Users/AllUsers'


type Props = {}

const page:FC<Props>=({})=> {
  return (
    <div>
    <Heading
    title="ELearning - Admin"
    description="Description1"
    keywords="Programming, MERN, Redux"
  />
  <div className="flex">
    <div className="1500px:w-[16%] w-1/5">
      <AdminSidebar />
    </div>
    <div className='w-[85%]'>
        <DashboardHeader/>
        <AllUsers isTeam={false}/>
    </div>
    </div>
</div>
  )
}

export default page