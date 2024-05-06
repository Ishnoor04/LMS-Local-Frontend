'use client'
import React, { FC } from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import Heading from '../../utils/Heading'
import DashboardHeader from '../../components/Admin/DashboardHeader'
import CourseAnalytics from '@/app/components/Admin/Analytics/CourseAnalytics'
import UserAnalytics from '@/app/components/Admin/Analytics/UserAnalytics'

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
        <UserAnalytics/>
    </div>
    </div>
</div>
  )
}

export default page