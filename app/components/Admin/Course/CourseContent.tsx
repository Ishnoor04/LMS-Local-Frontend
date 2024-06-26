import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { styles } from "@/app/Styles/style";
import toast from "react-hot-toast";
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const handleCollapsedToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };
  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };
  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    let newVideoSection = "";
    if (courseContentData.length > 0) {
      const lastVideoSection =
        courseContentData[courseContentData.length - 1].videoSection;
      if (lastVideoSection) {
        newVideoSection = lastVideoSection;
      }
    }
    const newContent = {
      videoLength:"",
      videoUrl: "",
      title: "",
      description: "",
      videoSection: newVideoSection,
      links: [
        {
          title: "",
          url: "",
        },
      ],
    };
    setCourseContentData([...courseContentData, newContent]);
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the field first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const nextButton = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the field first");
      return;
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {Array.isArray(courseContentData) &&
          courseContentData?.map((item: any, index: number) => {
            const showSectionInput =
              index === 0 ||
              item.videoSection !== courseContentData[index - 1].videoSection;
            return (
              <>
                <div
                  className={`w-full bg-[#cdc8c817] p-4 ${
                    showSectionInput ? "mt-10" : "mb-0"
                  }`}
                >
                  {showSectionInput && (
                    <>
                      <div className="flex w-full items-center">
                        <input
                          type="text"
                          className={`text-[20px] ${
                            item.videoSection === "Untitled Section"
                              ? "w-[170px]"
                              : "w-min"
                          } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                          value={item.videoSection}
                          placeholder="Untitled Section"
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].videoSection = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <BsPencil className="cursor-pointer dark:text-white text-black" />
                      </div>
                    </>
                  )}
                  <div className="flex w-full items-center justify-between my-0">
                    {isCollapsed[index] ? (
                      <>
                        {item.title ? (
                          <p className="font-Poppins dark:text-white text-black">
                            {index + 1}. {item.title}
                          </p>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}
                    {/* arrow button for collapsed video content */}
                    <div className="flex items-center">
                      <AiOutlineDelete
                        className={`dark:text-white text-black tet-[20px] ${
                          index > 0 ? "cursor-pointer" : "cursor-no-drop"
                        }`}
                        onClick={() => {
                          if (index > 0) {
                            const updatedData = [...courseContentData];
                            updatedData.splice(index, 1);
                            setCourseContentData(updatedData);
                          }
                        }}
                      />
                      <MdOutlineKeyboardArrowDown
                        fontSize="large"
                        className="dark:text-white text-black"
                        style={{
                          transform: isCollapsed[index]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                        onClick={() => handleCollapsedToggle(index)}
                      />
                    </div>
                  </div>
                  {!isCollapsed[index] && (
                    <>
                      <div className="my-3">
                        <label htmlFor="" className={`${styles.label}`}>
                          Video Title
                        </label>
                        <input
                          type="text"
                          placeholder="Project Plan..."
                          className={`${styles.input}`}
                          value={item.title}
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].title = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                      <div className="my-3">
                        <label htmlFor="" className={`${styles.label}`}>
                          Video Url
                        </label>
                        <input
                          type="text"
                          placeholder="eerds"
                          className={`${styles.input}`}
                          value={item.videoUrl}
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].videoUrl = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                      <div className="my-3">
                        <label htmlFor="" className={`${styles.label}`}>
                          Video Length (in minutes)
                        </label>
                        <input
                          type="number"
                          placeholder="20"
                          className={`${styles.input}`}
                          value={item.videoLength}
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].videoLength = e.target.value;
                            setCourseContentData(updatedData);
                            console.log(courseContentData)
                          }}
                        />
                      </div>

                      <div className="my-3">
                        <label htmlFor="" className={`${styles.label}`}>
                          Video Description
                        </label>
                        <textarea
                          rows={10}
                          cols={5}
                          placeholder="Describe your video"
                          className={`${styles.input} !h-min py-2`}
                          value={item.description}
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].description = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <br />
                        {item?.links.map((link: any, linkIndex: number) => {
                          return (
                            <div key={linkIndex} className="mb-3 block">
                              <div className="w-full flex items-center justify-between">
                                <label htmlFor="" className={`${styles.label}`}>
                                  Link {linkIndex + 1}
                                </label>
                                <AiOutlineDelete
                                  className={`${
                                    linkIndex === 0
                                      ? "cursor-no-drop"
                                      : "cursor-pointer"
                                  } text-black dark:text-white text-[20px]`}
                                  onClick={() => {
                                    linkIndex === 0
                                      ? null
                                      : handleRemoveLink(index, linkIndex);
                                  }}
                                />
                              </div>
                              <input
                                type="text"
                                placeholder="Source Code... (Link title)"
                                className={`${styles.input}`}
                                value={link.title}
                                onChange={(e: any) => {
                                  const updatedData = [...courseContentData];
                                  updatedData[index].links[linkIndex].title =
                                    e.target.value;
                                  setCourseContentData(updatedData);
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Source Url... (Link URL)"
                                className={`${styles.input}`}
                                value={link.url}
                                onChange={(e: any) => {
                                  const updatedData = [...courseContentData];
                                  updatedData[index].links[linkIndex].url =
                                    e.target.value;
                                  setCourseContentData(updatedData);
                                }}
                              />
                            </div>
                          );
                        })}
                        <br />
                        <div className="inline-block mb-4">
                          <p
                            className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                            onClick={() => handleAddLink(index)}
                          >
                            <BsLink45Deg className="mr-2" /> Add Link
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  <br />
                  {index === courseContentData.length - 1 && (
                    <div>
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={(e: any) => newContentHandler(item)}
                      >
                        <AiOutlinePlusCircle className="mr-2" /> Add New Content
                      </p>
                    </div>
                  )}
                </div>
              </>
            );
          })}
        <br />

        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer "
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center items-center flex justify-center text-white rounded-md mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Previous
        </div>
        <div
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center items-center flex justify-center text-white rounded-md mt-8 cursor-pointer"
          onClick={() => nextButton()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
