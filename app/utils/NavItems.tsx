import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];
type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="800px:flex hidden">
        {navItemsData &&
          navItemsData.map((items, index) => {
            return (
              <Link href={`${items.url}`} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {items.name}
                </span>
              </Link>
            );
          })}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center pt-16 flex flex-col gap-4">
          <div>
              <Link
                className={` text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                href={"/"}
              >
                Elearning
              </Link>
            </div>
            {navItemsData &&
              navItemsData.map((items, index) => {
                return (
                  
                  <Link href={`${items.url}`} key={index} passHref>
                    <span
                      className={`${
                        activeItem === index
                          ? "dark:text-[#37a39a] text-[crimson]"
                          : "dark:text-white text-black"
                      } text-[18px] my-12 font-Poppins font-[400] `}
                    >
                      {items.name}
                    </span>
                  </Link>
                );
              })}
            {/* <Link href="/" passHref>
              <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-[400]`}
              >

              </span>
            </Link> */}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
