'use client'
import AdminSidebar from '@/app/components/Admin/AdminSidebar'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
import EditCourse from '@/app/components/Admin/Course/EditCourse'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import EditFaq from '@/app/components/Admin/Faq/EditFaq'
import EditHero from '@/app/components/Admin/Hero/EditHero'
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
            <EditFaq/>
        </div>
        </div>
    </div>
  )
}

export default page