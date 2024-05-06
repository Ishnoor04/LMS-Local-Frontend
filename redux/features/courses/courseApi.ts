import { apiSlice } from "../api/apiSlice";
export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "admin-get-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUserAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUserSingleCourseContent:builder.query({
      query:(id) =>({
        url:`get-course/${id}`,
        method:"GET",
        credentials:"include" as const
      })
    }),
    getCourseContent: builder.query({
      query:(id)=>({
        url:`get-course-content/${id}`,
        method:"GET",
        credentials:"include" as const
      })
    }),
    addNewQuestion: builder.mutation({
      query:({question, courseId, contentId}) => ({
        url:"add-question",
        method:"PUT",
        body:{
          question, courseId, contentId
        },
        credentials:"include" as const
      })
    }),
    addNewAnswerToQuestion: builder.mutation({
      query:({answer, courseId, questionId, contentId})=>({
        url:"add-answer",
        body:{
          answer, courseId, questionId, contentId
        },
        credentials:"include" as const,
        method:"PUT"
      })
    }),
    addReviewInCourse: builder.mutation({
      query:({review, rating, courseId})=>({
        url:`add-reviews/${courseId}`,
        body:{
          review, rating        
        },
        credentials:"include" as const,
        method:"PUT"
      })
    })
  }),
});
export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUserAllCoursesQuery,
  useGetUserSingleCourseContentQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddNewAnswerToQuestionMutation,
  useAddReviewInCourseMutation
} = courseApi;
