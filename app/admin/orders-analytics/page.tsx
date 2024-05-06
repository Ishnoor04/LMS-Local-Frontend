'use client'
import React, { FC } from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import Heading from '../../utils/Heading'
import DashboardHeader from '../../components/Admin/DashboardHeader'

import OrderAnalytics from '@/app/components/Admin/Analytics/OrderAnalytics'

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
        <OrderAnalytics/>
    </div>
    </div>
</div>
  )
}

export default page