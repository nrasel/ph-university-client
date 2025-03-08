import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import PHInput from "../../../components/form/PHInput";

import { useState } from "react";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

const OfferCourse = () => {
  const [id, setId] = useState(" ");
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  const courseOptions = academicFacultyData?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    // const res = await addOfferedCourse(offeredCourseData);
    // console.log(res);
  };
  return (
    <div>
      {" "}
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHSelectWithWatch
              onValueChange={setId}
              name="course"
              label="Course"
              options={courseOptions}
            />
            <PHInput disabled={!id} type="text" name="test" label="Test" />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default OfferCourse;
