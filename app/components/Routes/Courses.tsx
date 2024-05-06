import { useGetUserAllCoursesQuery } from "@/redux/features/courses/courseApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUserAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);
  console.log(courses);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`w-[90%] 800px:w-[80%] m-auto`}>
          <h1 className="text-center font-Poppins tet-[25px] leading-[35px] sm:text-3xl lg:text-]4xl dark:text-white text-black">
            Expand Your Career{" "}
            <span className="text-gradient"> Opportunity</span> <br />
            Opportunity with our courses
          </h1>
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
      )}
    </div>
  );
};

export default Courses;
