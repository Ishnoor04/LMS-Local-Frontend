import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        courseAnalytics:builder.query({
            query:()=>({
                url:"get-courses-analytics",
                method:"GET",
                credentials:"include" as const
            })
        }),
        userAnalytics:builder.query({
            query:()=>({
                url:"get-users-analytics",
                method:"GET",
                credentials:"include" as const
            })
        }),
        orderAnalytics:builder.query({
            query:()=>({
                url:"get-orders-analytics",
                method:"GET",
                credentials:"include" as const
            })
        })
    })
})
export const {useCourseAnalyticsQuery, useUserAnalyticsQuery,useOrderAnalyticsQuery} = analyticsApi