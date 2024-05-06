"use client";
import React, { FC, useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import Footer from "../components/Footer/Footer";
import CourseCard from "../components/Course/CourseCard";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/courseApi";
import { useLogOutUserQuery } from "@/redux/features/user/userApi";
type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const {} = useLogOutUserQuery(undefined, {
    skip: !logout ? true : false,
  });
  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
    redirect('/')
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (data) {
      const filterCourses = user.courses.map((userCourse: any) =>
        data.courses
          .find((course: any) => course._id === userCourse._id))
          .filter((course: any) => course !== undefined);
      setCourses(filterCourses)

    }
  }, [data]);

  return (
    <>
      <div className="w-[85%] flex mx-auto ">
        <div
          className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 border  bg-opacity-90 dark:border-[#ffffff1d] border-black rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
            scroll ? "top-[120px]" : "top-[30px]"
          } left-[30px]`}
        >
          <SidebarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
          />
        </div>
        {active === 1 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <ProfileInfo user={user} avatar={avatar} />
          </div>
        )}
        {active === 2 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <ChangePassword />
          </div>
        )}
        {active === 3 && (
          <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[25px] mb-12 border-0">
              {courses &&
                courses.map((course: any, index: number) => {
                  return (
                    <div key={index}>
                      <CourseCard course={course} key={index} />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
