'use client'
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Profile from './Profile'
import { useSelector } from 'react-redux'
type Props = {}

const Page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const [activeItem,setActiveItem] = useState(5);
    const {user} = useSelector((state:any)=>state.auth)
  return (
    <div>
        <Protected>
        <Heading
        title={`${user?.name}'s profile`}
        description="Description1"
        keywords="Programming, MERN, Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Profile user={user} />
        </Protected>
    </div>
  )
}

export default Page