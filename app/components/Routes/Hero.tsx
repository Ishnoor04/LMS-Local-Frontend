import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [search, setSearch] = useState("")
  const router = useRouter()
  const handleSearch=()=>{
    if(search === "") {
      return
    }else {
      router.push(`/courses?title=${search}`)
    }
  }
  return (
    <>
      {
        isLoading ? <Loader/> : (
          <div className="w-full 1000px:flex items-center mx-10">
        <div className=" top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] justify-center items-center  1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation flex flex-row rounded-full mt-10">
          <div className=" flex 1000px:min-h-screen items-center justify-center pt-[70px] 1000px:pt-[0] z-10">
            <Image
              src={data?.layoutData[0].banner?.image?.url}
              style={{
                width: "90%",
                height:"90%"
              }}
              width={400} height={400}
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
              alt=""
            />
            {/* <Image
            src="https://edmy-react.hibootstrap.com/imgs/banner/banner-img-1.png"
            alt=""
            className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
          /> */}
          </div>
        </div>
        <div className="1000px:w-[60%] flex flex-col 1000px:mt-[0px] text-center 1000px:text-left mt-[150px] px-20">
          <h2 className=" dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px]">
            {data?.layoutData[0].banner?.title}{" "}
          </h2>
          <br />
          <p className="dark:text-[#edfff4] Dtext-[#000000ac] font-Josefin font-[600] text-[18px] w-[78%] mx-0 px-3">
            {" "}
            {data?.layoutData[0].banner?.subTitle}
          </p>
          <br />
          <br />
          <div className="w-[78%] h-[50px] px-3 bg-transparent relative bg-gray-500 rounded-xl flex flex-row gap-2">
            <input
              type="search"
              placeholder="Search Courses…"
              className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]" onClick={handleSearch}> 
              <BiSearch className="text-white" size={30} />
            </div>
          </div>
          <br />
          <br />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center mx-4">
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="rounded-full"
            />
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="rounded-full ml-[-20px]"
            />
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="rounded-full ml-[-20px] mx-4"
            />
            {/* <Image
              src={require("../../../public/assests/client-1.jpg")}
              alt=""
              className=" rounded-full"
            />
            <Image
              alt=""
              src={require("../../../public/assests/client-2-jpg")}
              className="rounded-full ml-[-20px]"
            />
            <Image
              src={require("../../../public/assests/client-3-jpg")}
              alt=""
              className="rounded-full ml-[-20px]"
            /> */}
            <p className="font-Josefin">
              500K+ People already trusted us.{" "}
              <Link
                href="/courses"
                className=" dark:text-[#46e256] text-[crimson] dark:text-[#edfff4] text-[#000000b3] 1000px:p1-3 text-[18px] font-[600]"
              >
                View Courses
              </Link>{" "}
            </p>
          </div>
          <br />
        </div>
      </div>
        )
      }
    </>
  );
};

export default Hero;
