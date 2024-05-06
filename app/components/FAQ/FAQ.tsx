import { styles } from "@/app/Styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);
  // console.log(data?.layoutData[0]?.faq[0])
  useEffect(() => {
    if (data) {
      setQuestions(data?.layoutData[0]?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
    <h2 className="mb-12 pb-4 text-center text-3xl font-bold">FAQs</h2>

      <div className="mt-12">
        <dl className="space-y-8">
          {questions.map((q: any) => (
            <div
              key={q._id}
              className={`${
                q._id !== questions[0]?._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <input
                    className={`${styles.input} border-none`}
                    value={q.question}
                    placeholder={"Add your question…"}
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
                  <input
                    className={`${styles.input} border-none`}
                    value={q.answer}
                    placeholder={"Add your answer..."}
                  />
                </dd>
              )}
            </div>
          ))}
        </dl>
        <br />
        <br />
      </div>
    </div>
  );
};

export default FAQ;
