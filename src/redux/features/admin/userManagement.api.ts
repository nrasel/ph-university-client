import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        console.log(args)
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        //29-8 number video
        console.log("Inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    getAllFaculties: builder.query({
      query: (args) => {
        console.log("naimur", args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        //29-8 number video
        console.log("Inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
    }),
  }),
});
export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetAllFacultiesQuery,
  useChangePasswordMutation,
  useAddFacultiesMutation,
} = userManagement;
