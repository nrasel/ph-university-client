import { TQueryParam, TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-course/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["OfferedCourse"],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllEnrolledCourses: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrlled-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["OfferedCourse"],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    enrolledCourse: builder.mutation({
      query: (data) => ({
        url: "/enrlled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OfferedCourse"],
    }),
  }),
});

export const {
  useGetAllOfferedCoursesQuery,
  useEnrolledCourseMutation,
  useGetAllEnrolledCoursesQuery,
} = studentCourseApi;
