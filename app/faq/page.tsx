'use client'
import React, { use, useState } from 'react'
import Heading from '../utils/Heading'
import FAQ from '../components/FAQ/FAQ'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'

type Props = {}

const Page = (props: Props) => {
    const [open,setOpen] = useState(false)
    const [route, setRoute] = useState("Login")
  return (  
    <div>
        <Heading
        title="FAQ - Elearning"
        description="Description1"
        keywords="Programming, MERN, Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={4}
        route={route}
        setRoute={setRoute}
      />
      <FAQ/>
      <Footer/>
    </div>
  )
}

export default Page