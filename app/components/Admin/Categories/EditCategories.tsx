import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import { dividerClasses } from '@mui/material';
import { styles } from '@/app/Styles/style';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';

type Props = {}

const EditCategories = (props: Props) => {
    const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
        refetchOnMountOrArgChange: true,
      });
      const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
      const [categories, setCategories] = useState<any[]>([])
      useEffect(() => {
        if (data) {
          setCategories(data?.layoutData[0]?.categories);
        }
        if (isSuccess) {
            toast.success("Categories updated Successfully");
            refetch()
          }
          if (error) {
            if ("data" in error) {
              const errorMessage = error as any;
              toast.error(errorMessage.data.message);
            }
          }
      }, [data,isSuccess,error,refetch]);
      console.log(categories);
      const toggleCategory= (id: any) => {
        setCategories((prevCategories) =>
          prevCategories.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
        );
      };
      const handleCategoryChange = (id: any, value: string) => {
         setCategories((prevCategories) =>
          prevCategories.map((q) => (q._id === id ? { ...q, title: value } : q))
        );
      };
      const newCategoryHandler = () => {
        setCategories([
          ...categories,
          {
            title: "",
          },
        ]);
      };
      const areCategoriesUnchanged = (
        originalCategories: any[],
        newCategories: any[]
      ) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
      };
      const isAnyCategoryEmpty = (categories: any[]) => {
        return categories.some((q) => q.title === "");
      };
      const handleEdit = async () => {
        if(!areCategoriesUnchanged(data?.layoutData[0]?.categories,categories) && !isAnyCategoryEmpty(categories)) {
            await editLayout({
                type:"Categories",
                categories:categories
            })
        }
      };
      return (
      <>
     {isLoading ? <Loader/> : (
          <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
            <h1 className={`${styles.title}`}>All Categories</h1>
          <div className="mt-12">
            <dl className="space-y-8">
              {categories.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== categories[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleCategory(q._id)}
                    >
                      <input
                        className={`${styles.input} border-none`}
                        value={q.title}
                        onChange={(e: any) =>
                          handleCategoryChange(q._id, e.target.value)
                        }
                        placeholder={"Add your title…"}
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() => {
                            setCategories((prevCategories) =>
                              prevCategories.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoryHandler}
            />
          </div>
          <div
            className={` ${
              styles.button
            } !w-[100px] Imin-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
              areCategoriesUnchanged(data?.layoutData[0]?.categories, categories) ||
              isAnyCategoryEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            } !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data?.layoutData[0]?.categories, categories) ||
              isAnyCategoryEmpty(categories)
                ? () => null
                : handleEdit
            }
          >
            Save{" "}
          </div>
        </div>
      )
}
      </>
      );
}

export default EditCategories