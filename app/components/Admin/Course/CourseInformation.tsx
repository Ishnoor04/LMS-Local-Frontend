import { styles } from "@/app/Styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { read } from "node:fs";
import { describe } from "node:test";
import React, { FC, useEffect, useState } from "react";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
};

const CourseInformation: FC<Props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);
  const {data} = useGetHeroDataQuery("Categories",{
    refetchOnMountOrArgChange:true
  })
  const [categories,setCategories] = useState([])
  useEffect(()=>{
    if(data) {
      setCategories(data?.layoutData[0]?.categories);
    }
  },[data])
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className="">
        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type="name"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN Stack course"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing"
            className={`${styles.input} !h-min !py-2 `}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-center gap-10">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="" className={`${styles.label}`}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        {/* <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type="text"
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN , NEXT13, Socket io, Tailwind CSS"
            className={`${styles.input}`}
          />
        </div> */}
        <div className="w-full flex justify-between gap-10">
          <div className="w-[45%]">
          <label htmlFor="" className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type="text"
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN , NEXT13, Socket io, Tailwind CSS"
            className={`${styles.input}`}
          />
          </div>
          <div className="w-[50%]">
          <label htmlFor="" className={`${styles.label}`}>
            Categories
          </label>
          <select name="" id="" className={`${styles.input}`} value={courseInfo.categories} onChange={(e: any) => {
            setCourseInfo({ ...courseInfo, categories: e.target.value })


          }
              }>
            <option value="">Select Category</option>
            {categories.map((item:any)=>(
              <option value={item.title} key={item._id}>{item.title}</option>
            ))}
          </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between gap-10">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner, Intermediate, Expert"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="" className={`${styles.label}`}>
              Demo URL
            </label>
            <input
              type="text"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="file" 
          className={`w-full min-h-[10vh] dark:border-white border-black p-3 border flex items-center justify-center ${
            dragging ? "bg-blue-500" : "bg-transparent"
          }`}
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          >
            {
              courseInfo.thumbnail ? (
                <img src={courseInfo.thumbnail} alt="" className="max-h-full w-full object-cover "/>
              ) : (
                <span className="text-black dark:text-white ">
                  Drag and Drop your thumbnail here r click to browse
                </span>
              )
            }
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
            <input type="submit" value="Next" className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded-md mt-8 cursor-pointer" />
        </div> 
      </form>
      <br /><br /><br />
    </div>
  );
};

export default CourseInformation;
