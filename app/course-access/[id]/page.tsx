'use client'
import CourseContent from '@/app/components/Course/CourseContent'
import CourseDetailsPage from '@/app/components/Course/CourseDetailsPage'
import Loader from '@/app/components/Loader/Loader'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

const Page = ({params}:any) => {
    const id = params.id
    const {isLoading, data,error} = useLoadUserQuery({})
    useEffect(()=>{
        if(data) {
            const isPurchased = data.user.courses.find((item:any)=>item._id === id)
            if(!isPurchased) {
                redirect('/')
            }
            if(error) {
                redirect('/')
            }
        }
    },[data,error])
  return (
    <div>
      {isLoading ? <Loader/> : (
        <div>
            <CourseContent id={id} user={data.user}/>
        </div>
      )}
    </div>
  )
}

export default Page