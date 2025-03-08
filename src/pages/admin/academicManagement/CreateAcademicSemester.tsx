import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { monthsOptions } from "../../../assets/constants/global";
import { semesterOptions } from "../../../assets/constants/semester";
import { yearOptions } from "../../../assets/constants/year";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { academisSemesterSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types";

const CreateAcademicSemester = () => {
  const [addAcaddemicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating.....");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      console.log(semesterData);
      const res = (await addAcaddemicSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Semester added successfully!", { id: toastId });
        // navigate to academic semester page
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academisSemesterSchema)}
        >
          <PHSelect name="name" label="Name" options={semesterOptions} />
          <PHSelect name="year" label="Year" options={yearOptions} />
          <PHSelect
            name="startMonth"
            label="Start Month"
            options={monthsOptions}
          />
          <PHSelect name="endMonth" label="End Month" options={monthsOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
