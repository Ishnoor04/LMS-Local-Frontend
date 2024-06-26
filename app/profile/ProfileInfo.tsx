'use client'
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarIcon from "../../public/assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../Styles/style";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, {isSuccess:success, error:updateError }] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {skip: loadUser ? false: true})
  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = async() => {
      if (fileReader.readyState === 2) {
          const avatar = fileReader.result

        await updateAvatar(
          avatar
        );
      }
    };
    fileReader.readAsDataURL(e.target.files[0])
  };

  useEffect(()=>{
     if(isSuccess || success) {
        toast.success("Profile Updated Successfully")
        setLoadUser(true)
     }
     if(error || updateError) {
        console.log(error)
     }
  },[isSuccess,error,success,updateError])
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(name!=="") {
        await editProfile({
            name: name,
            email:user.email
        })
    }
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-[1] text-white" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="w-[100%]">
            <label className="pb-2 block">Full Name</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-[100%] pt-2">
            <label className="pb-2 block">Email Address</label>
            <input
              type="text"
              readOnly
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={user?.email}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
          />
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
