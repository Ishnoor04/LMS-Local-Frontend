"use client";
import React, { FC, useEffect, useState } from "react";
import { styles } from "../Styles/style";
import { useEditPasswordMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editPassword, {isSuccess, error}] = useEditPasswordMutation();
  const passwordChangeHandler = async(e:any) => {
    e.preventDefault
    if(oldPassword === "" || newPassword === "" || confirmPassword === "") {
        toast.error("Fill all the fields")
    }
    if(newPassword !== confirmPassword) {
        await editPassword({oldPassword, newPassword})
    }
  };
  useEffect(()=>{
    if(isSuccess) {
        toast.success("Password updated")
    }
    if(error) {
        if("data" in error) {
            const errorData = error as any;
            toast.error(errorData.data.message)
        }
    }
  },[isSuccess,error])
  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0 ">
      <h1 className="bloack text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] dark:text-white text-black pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="pb-2 block dark:text-white text-black">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`}
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="pb-2 block dark:text-white text-black">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`}
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="pb-2 block dark:text-white text-black">Confirm your password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
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
    </div>
  );
};

export default ChangePassword;
