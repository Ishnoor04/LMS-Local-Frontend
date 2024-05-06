import { styles } from "@/app/Styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};
//data.layoutData.banner.title
const EditHero: FC<Props> = (props) => {
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();
  const [image, setImage] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [title, setTitle] = useState("");
  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
        reader.readAsDataURL(file);
      };
    }
  };
  const handleEdit = async () => {
    await editLayout({ type: "Banner", image, title, subTitle: subtitle });
  };
  console.log(data);
  useEffect(() => {
    if (data) {
      setImage(data?.layoutData[0].banner?.image?.url);
      setTitle(data?.layoutData[0].banner?.title);
      setSubtitle(data?.layoutData[0].banner?.subTitle);
      console.log(image, title, subtitle);
    }
    if (isSuccess) {
      refetch()
      toast.success("Hero updated Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, isSuccess, error]);

  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className=" top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] justify-center items-center  1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation flex flex-row rounded-full mt-10">
          <div className="1000px:w-[40%) flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
            <div className="relative flex items-center justify-end">
              <img
                src={image}
                alt=""
                className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
              />
              <input
                type="file"
                name=""
                id="banner"
                accept=" image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-0 right-0 z-20"
              >
                <AiOutlineCamera className=" dark:text-white text-black text-[18px]" />
              </label>
            </div>
          </div>
        </div>
        <div className="1000px:w-[60%] flex flex-col 1000px:mt-[0px] text-center 1000px:text-left mt-[150px] px-20">
          <textarea
            name=""
            id=""
            className=" dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px]"
            value={title}
            rows={4}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          ></textarea>
          <br />
          <textarea
            name=""
            id=""
            className=" dark:text-[#edfff4] Dtext-[#000000ac] font-Josefin font-[600] text-[18px] w-[78%] mx-0 px-3"
            value={subtitle}
            rows={3}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="subTitle"
          ></textarea>
          <br />
          <br />
          <br />
          <div
            className={` ${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black Dbg-[#cccccc34] ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subtitle ||
              data?.layout?.banner?.image?.url !== image
                ? "!cursor-pointer •!bg-[#42d383]"
                : "!cursor-not-allowed"
            }!rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subtitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
