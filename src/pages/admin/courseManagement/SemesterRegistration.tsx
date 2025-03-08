import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { semesterStatusOptions } from "../../../assets/constants/semester";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisterSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);
  console.log(academicSemester);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating.....");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      console.log(semesterData);
      const res = (await addSemester(semesterData)) as TResponse<any>;
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
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
