import { styles } from "@/app/Styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from "../Payment/CheckoutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setOpen:any
  setRoute:any
};

const CourseDetails = ({ data, stripePromise, clientSecret, setOpen:openAuthModal, setRoute,  }: Props) => {
  const [open, setOpen] = useState(false);
  const {data:userData} = useLoadUserQuery(undefined,{});
  const [user,setUser] = useState<any>()
  useEffect(()=>{
    setUser(userData?.user)
  }, [userData])
  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);
  const handleOrder = (e: any) => {
    if(user) {
      setOpen(true);

    }else {
      setRoute('Login')
      openAuthModal(true)
    }
  };

  return (
    <div className="w-[90%] py-5 m-auto">
      <div className="w-full flex flex-col-reverse 800px:flex-row">
        <div className="w-full 800px:w-[65%] 800px:pr-5">
          <h1 className="text-[25px] font-Poppins text-black dark:text-white">
            {data.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={data.ratings} />
              <h5 className="text-black dark:text-white">
                {data?.reviews.length} Reviews
              </h5>
            </div>
            <h5 className="text-black dark:text-white">
              {data.purchased} Students
            </h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins text-black dark:text-white">
            What will you learn from this course
          </h1>
          <div>
            {data?.benefits.map((benefit: any, index: number) => (
              <div key={index} className="w-full flex 800px:items-center py-2">
                <div className="mr-1 w-[15px]">
                  <IoMdCheckmarkCircleOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">
                  {benefit.title}
                </p>
              </div>
            ))}
            <br />
            <br />
          </div>
          <h1 className="text-[25px] font-Poppins text-black dark:text-white">
            What are the prerequisites for this course?
          </h1>
          {data.prerequisites.map((prerequisite: any, index: number) => (
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="mr-1 w-[15px]">
                <IoMdCheckmarkCircleOutline
                  size={20}
                  className="text-black dark:text-white"
                />
              </div>
              <p className="pl-2 text-black dark:text-white">
                {prerequisite.title}
              </p>
            </div>
          ))}
          <br />
          <br />
          <div>
            <h1 className="text-[25px] font-Poppins text-black dark:text-white">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
          </div>
          <br />
          <br />
          <div className="w-full">
            <h1 className="text-[25px] font-Poppins text-black dark:text-white">
              Course Details
            </h1>
            <p className="text-black dark:text-white text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden ">
              {data.description}
            </p>
          </div>
          <br />
          <br />
          <div className="w-full">
            <div className=" justify-start 800px:flex 800px:flex-col">
              <div className="flex flex-row">
                <Ratings rating={data?.ratings} />{" "}
                {Number.isInteger(data?.ratings)
                  ? data.ratings.toFixed(1)
                  : data?.ratings.toFixed(2)}{" "}
                Course Rating
              </div>
              <div className="mb-2 800px:mb-[unset]">
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {data?.reviews.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews).map((review: any, index: number) => (
                <div key={index} className="w-full pb-2">
                  <div className="flex ">
                    <div className="w-[50px] h-[50px]">
                      <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                        <h1 className="uppercase text-[18px] text-black dark:text-white">
                          {review.user.name.slice(0, 2)}
                        </h1>
                      </div>
                    </div>
                    <div className="hidden 800px:block pl-2">
                      <div className="flex items-center">
                        <h5 className="pr-2 text-black dark:text-white text-[18px]">
                          {review.user.name}
                        </h5>
                        <Ratings rating={review.rating} />
                      </div>
                      <p className="text-black dark:text-white">
                        {review.comment}
                      </p>
                      <small className="text-black dark:text-white">
                        {format(review.createdAt)}
                      </small>
                    </div>
                    <div className="pl-2 flex 800px:hidden items-center">
                      <h5 className="pr-2 text-black dark:text-white text-[18px]">
                        {review.user.name}
                      </h5>
                      <Ratings rating={review.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full 800px:w-[35%] relative">
          <div className="sticky top-[100px] left-0 z-50 w-full">
            <CoursePlayer videoUrl={data.demoUrl} title={data.title} />

            <div className="flex items-center">
              <h1 className="pt-5 text-[25px]">
                {data?.price === 0 ? "Free" : data?.price + "$"}
              </h1>
              <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                {data?.estimatedPrice}$
              </h5>
              <h4 className="pl-5 pt-4 text-[22px]">
                {discountPercentagePrice}% Off
              </h4>
            </div>
            <div className="flex items-center">
              {isPurchased ? (
                <Link
                  className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                  href={`/course-access/${data._id}`}
                >
                  Enter to Course
                </Link>
              ) : (
                <div
                  className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                  onClick={handleOrder}
                >
                  Buy Now {data?.price}$
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="bg-white w-[500px] min-h-[500px] rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoMdCloseCircleOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                 {
                    stripePromise && clientSecret && (
                        <Elements stripe={stripePromise} options={{clientSecret}}>
                            <CheckoutForm data={data} setOpen={setOpen} user={user}/>
                        </Elements>
                    )
                 }
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
