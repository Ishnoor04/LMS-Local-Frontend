"use client";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/courseApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../Styles/style";
import CourseCard from "../components/Course/CourseCard";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layoutData[0]?.categories;
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header
            route={route}
            setRoute={setRoute}
            activeItem={1}
            open={open}
            setOpen={setOpen}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70px]">
            <Heading
              title={"All Courses - Elearning"}
              description="Elearning is a programming community"
              keywords={"Programming Community, Coding Skills, expert insights"}
            />
            <br />
            <div className="flex w-full items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-blue-600"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >All</div>
              {categories && categories.map((item:any, index:number)=>(
                <div key={index}>
                    <div className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-blue-600"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`} onClick={()=>setCategory(item.title)}>
                        {item.title}
                    </div>
                </div>
              ))}
            </div>
            {
                courses && courses.length === 0 && (
                    <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                        {search ? "No Courses Found" : "No courses found in this category"}
                    </p>
                )
            }
            <br />
          <br />
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[25px] mb-12 border-0">
            {courses &&
              courses.map((course: any, index: number) => {
                return <div key={index}>
                  <CourseCard
                  course={course}
                  key={index}
                  />
                </div>;
              })}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
