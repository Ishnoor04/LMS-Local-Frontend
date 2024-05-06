import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../Styles/style";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid Email").required("Please enter an email"),
  password: Yup.string().required("Please enter a password").min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, {isError,data, error, isSuccess}] = useRegisterMutation();

  useEffect(()=>{
    if(isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification")
    }
    if(error) {
      if("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error]);
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name,email, password }) => {
      const data = {
        name,email,password
      }
      await register(data);
       
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <div className={`${styles.title}`}>Join to Elearning</div>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="name">
          Enter your name
        </label>
        <input
          type="text"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="John Doe"
          className={`${errors.name && touched.name && "border-red-500"} ${
            styles.input
          } mb-3`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        <label className={`${styles.label}`} htmlFor="email">
          Enter your email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@mail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name=""
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or Join With:
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Already have an Account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Login
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Signup;