import { styles } from "@/app/Styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import avatar from "../../../public/assets/avatar.png";
import toast from "react-hot-toast";
import {
  useAddNewAnswerToQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewInCourseMutation,
  useGetUserSingleCourseContentQuery,
} from "@/redux/features/courses/courseApi";
import Ratings from "@/app/utils/Ratings";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import socketIO from 'socket.io-client'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ''
const socketId = socketIO(ENDPOINT, {transports:['websocket']})

type Props = {
  id: string;
  data: any;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};
const CourseContentMedia: FC<Props> = ({
  id,
  data,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  
  const [
    addNewQuestion,
    { isSuccess, isLoading: questionCreationLoading, error },
  ] = useAddNewQuestionMutation();
  const [
    addNewAnswerToQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddNewAnswerToQuestionMutation();
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const {data:courseData, refetch:courseRefetch} = useGetUserSingleCourseContentQuery(id,{refetchOnMountOrArgChange:true})
  console.log(courseData?.course)
  const course = courseData?.course
  const isReview = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Please write a question");
    } else {
      console.log(data);
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };
  const handleAnswerSubmit = () => {
    // console.log("handkle answet submit");
    console.log("hhhh");
    addNewAnswerToQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId,
    });
  };
  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty ");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };
  useEffect(() => {

    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added Successfully");
      socketId.emit("notification",{
        title:"New Question",
        message:`You have a new question from ${user.name} in ${data[activeVideo].title} of course ${course.name}`,
        userId:`${user._id}`
      })
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added Successfully");
      if(user.role !== "admin") {
        socketId.emit("notification",{
          title: `You have a new question reply from ${user?.name} on ${data[activeVideo].title} in ${course?.name}`,
          message: answer,
          userId:`${user._id}`
        })
      }
    }
    if (reviewSuccess) {
      setReview("");
      courseRefetch();
      toast.success("review added successfully");
      socketId.emit("notification",{
        title:"New Review",
        message:`You have a new review from ${user.name} of course ${course.name}`,
        userId:`${user._id}`
      })
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewError,
    reviewSuccess,
    course, courseRefetch, refetch
  ]);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        videoUrl={data[activeVideo]?.videoUrl}
        title={data[activeVideo]?.title}
      />
      <div className="w-full flex justify-between items-center my-3">
        <div
          className={`${
            styles.button
          } text-black dark:text-white !w-[200px] !min-h-[40px] !py-[onset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" /> Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } !w-[200px] text-black dark:text-white  !min-h-[40px] !py-[onset] ${
            activeVideo === data.length - 1 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <AiOutlineArrowRight className="mr-2" /> Next Lesson
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] text-black dark:text-white ">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded">
        {["OverView", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer  ${
              activeBar === index
                ? "text-red-500"
                : " text-black dark:text-white"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo].description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => {
            return (
              <div key={index} className="mb-5">
                <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                  {item.title && item.title + " :"}
                </h2>
                <a
                  href={item.url}
                  className="inline-block text-teal-200 800px:text-[20px] 800px:pl-2"
                >
                  {item.url}
                </a>
              </div>
            );
          })}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              className="rounded-full object-cover h-[50px]"
              alt=""
            />
            <textarea
              name=""
              id=""
              cols={40}
              rows={10}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Write your question"
              className={`${styles.input} !h-[80px]`}
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[unset] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading ? "cursor-not-allowed" : ""
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            {/* question reply feature */}
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <>
          {!isReview && (
            <>
              <div className="flex w-full">
                <Image
                  src={user.avatar ? user.avatar.url : avatar}
                  width={50}
                  height={50}
                  className="rounded-full object-cover h-[50px]"
                  alt=""
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                    Give a rating <span className="text-red-500">*</span>
                  </h5>
                  <div className="flex w-full ml-2 pb-3">
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <textarea
                    name=""
                    id=""
                    cols={40}
                    rows={5}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review"
                    className={`${styles.input}`}
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div
                  className={`${styles.button} !w-[unset] !h-[40px] text-[18px] mt-5`}
                  onClick={
                    reviewCreationLoading ? () => {} : handleReviewSubmit
                  }
                >
                  Submit
                </div>
              </div>
            </>
          )}
          <br />
          <div className="w-full h-[1px] bg-white">
            <div className="w-full">
              { course.reviews && (course?.reviews && [...course?.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full my-5" key={index}>
                    <div className="w-full flex">
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                          <h1 className="uppercase text-[18px]">
                            {item.user.name.slice(0, 2)}{" "}
                          </h1>
                        </div>
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className="text-I#ffffff83]">
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  user,
  handleAnswerSubmit,
  setQuestionId,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            setQuestionId={setQuestionId}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  user,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex ">
          {user.avatar ? (
            <Image
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              className="rounded-full object-cover h-[50px]"
              alt=""
            />
          ) : (
            <div className="w-[50px] h-[50px]">
              <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                <h1 className="uppercase text-[18px] text-black dark:text-white">
                  {item.user.name.slice(0, 2)}
                </h1>
              </div>
            </div>
          )}

          <div className="hidden 800px:block pl-2">
            <div className="flex items-center">
              <h5 className="pr-2 text-black dark:text-white text-[18px]">
                {item.user.name}
              </h5>
            </div>
            <p className="text-black dark:text-white">{item.comment}</p>
            <small className="text-black dark:text-white">
              {format(item.createdAt)}
            </small>
          </div>
          {/* <div className="pl-2 flex 800px:hidden items-center">
                      <h5 className="pr-2 text-black dark:text-white text-[18px]">
                        {item.user.name}
                      </h5>
                      <Ratings rating={item.rating} />
                    </div> */}
        </div>
        <div className="flex w-full">
          <span
            className="text-black dark:text-white 800px:pl-16 cursor-pointer mr-2"
            onClick={() => {
              setQuestionId(item._id);
              setReplyActive(!replyActive);
            }}
          >
            {!replyActive
              ? item.commentReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage size={20} className="cursor-pointer" />
          <span className="pl-1 mt-[-4px] cursor-pointer">
            {item.commentReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.commentReplies.map((item: any, index: number) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={index}
              >
                <div>
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    width={50}
                    height={50}
                    className="rounded-full object-cover h-[50px]"
                    alt=""
                  />
                </div>
                <div className="pl-2">
                  <div className="flex items-center">
                    <h5 className="text-[20px]"> {item.user.name}</h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled
                        size={20}
                        className="text-green-400 ml-2"
                      />
                    )}
                  </div>
                  <p>{item.answer}</p>
                  <small>{format(item.createdAt)}</small>
                </div>
              </div>
            ))}
            <>
              <div className="flex relative w-full text-black dark:text-white">
                <input
                  type="text"
                  placeholder="Enter your answer"
                  value={item.answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={`${styles.input}`}
                />
                <button
                  type="submit"
                  onClick={handleAnswerSubmit}
                  className={`${styles.button} !w-[unset]`}
                  disabled={answer === ""}
                >
                  {" "}
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
