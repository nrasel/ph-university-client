import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { TQueryParam } from "../../../types";

const CreateAcademicDepartment = () => {
  const [params] = useState<TQueryParam[] | undefined>([]);
  const { data: academicFacultyData } = useGetAllAcademicFacultyQuery(params);
  const [addDepartment] = useAddAcademicDepartmentMutation();

  console.log(academicFacultyData);

  const facultyOptions = academicFacultyData?.data?.map((item: any) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating.....");

    // const departmentData = {
    //   name: data.name,
    //   academicFaculty: data.academicFaculty,
    // };

    // try {
    //   const res = (await addDepartment(departmentData)) as TResponse<any>;
    //   if (res.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.success("Academic Department created successfully!", {
    //       id: toastId,
    //     });
    //     // navigate to academic semester page
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong!", { id: toastId });
    // }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput type="text" name="name" label="Academic Department" />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={facultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
