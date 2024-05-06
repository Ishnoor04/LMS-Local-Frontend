import { useGetUserSingleCourseContentQuery } from '@/redux/features/courses/courseApi'
import React, { FC, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import Heading from '@/app/utils/Heading'
import Header from '../Header'
import Footer from '../Footer/Footer'
import CourseDetails from './CourseDetails'
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi'
import {loadStripe} from '@stripe/stripe-js'
type Props = {
    id:string
}

const CourseDetailsPage:FC<Props> = ({id}) => {
    const [route,setRoute] = useState("Login");
    const [open,setOpen] = useState(false)
    const {data, isLoading} = useGetUserSingleCourseContentQuery(id,{refetchOnMountOrArgChange:true})
    const {data:config} = useGetStripePublishableKeyQuery({});
    const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation()
    console.log(paymentIntentData)
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('')
    useEffect(()=>{
        if(config) {
            const publishablekey = config?.publishablekey
            setStripePromise(loadStripe(publishablekey))
        }
        if(data) {
            const amount = Math.round(data.course.price * 85)
            createPaymentIntent(amount)
        }
    },[config, data])
    useEffect(()=>{
        if(paymentIntentData) {
            setClientSecret(paymentIntentData.client_secret)
        }
    }, [paymentIntentData])
  return (
    <>
    {
        isLoading ? <Loader/> :(
            <div>
                <Heading
                title={data.course.name + " - ELearning"}
                description={`Course Description`}
                keywords={data.course.tags}
                />
                <Header
                open={open}
                setOpen={setOpen}
                route={route}
                setRoute={setRoute}
                activeItem={1}
                />
                {stripePromise && (
                    <CourseDetails
                    data={data.course}
                    stripePromise={stripePromise}
                    clientSecret = {clientSecret}

                    setOpen={setOpen}

                    setRoute={setRoute}
                    />

                )}
                <Footer/>
            </div>
        )
    }
    </>
  )
}

export default CourseDetailsPage