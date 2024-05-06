import { styles } from "@/app/Styles/style";
import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  course: any;
  key: number;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ course, key, isProfile }) => {
  return (
    <Link
      href={
        !isProfile ? `/course/${course._id}` : `course-access/${course._id}`
      }
    >
      <div
        className={`w-full min-h-[35px] dark:bg-slate-500  backdrop-blur border dark:border-[#fff] border-[#000] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner`}
      >
        <Image
          src={course?.thumbnail?.url}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded w-full"
          alt=""
        />
        <br />
        <h1 className={`${styles.title}`}>{course.name}</h1>
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={course.ratings} />
          <h5
            className={`text-black dark:text-white ${
              isProfile && "hidden 800px:inline"
            }`}
          >
            {course.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between p-3">
          <div className="flex">
            <h3 className="text-black dark:text-white">
              {course.price === 0 ? "Free" : course.price + "$"}
            </h3>
            <h5 className="pl-3 text-[14px]  line-through opacity-80 text-black dark:text-white ">
              {course.estimatedPrice ? course.estimatedPrice + "$": ""}
            </h5>
          </div>
            <div className="flex items-center pb-3">
              <AiOutlineUnorderedList size={20} fill="#fff"/>
              <h5 className="pl-3 text-[14px] text-black dark:text-white ">
              {course.courseData?.length} Lectures
            </h5>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
