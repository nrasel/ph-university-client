import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types";

const CreateAcademicFacfulty = () => {
  const [addAcademicFaculty, { data, error }] = useAddAcademicFacultyMutation();
  console.log(data, error);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating.....");

    const facultyData = {
      name: data.name,
    };

    try {
      const res = (await addAcademicFaculty(facultyData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Faculty created successfully!", {
          id: toastId,
        });
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
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput type="text" name="name" label="Academic Faculty" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFacfulty;
