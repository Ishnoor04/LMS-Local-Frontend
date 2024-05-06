'use client'
import AdminSidebar from '@/app/components/Admin/AdminSidebar'
import EditCategories from '@/app/components/Admin/Categories/EditCategories'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import Heading from '@/app/utils/Heading'
import React, { FC } from 'react'

type Props = {}

const page: FC<Props> = ({params}:any)=>{
  const id = params?.id
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
            <EditCategories/>
        </div>
        </div>
    </div>
  )
}

export default page