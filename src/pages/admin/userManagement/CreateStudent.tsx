import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../assets/constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../types";

// const studentDummyData = {
//   password: "student123",
//   student: {
//     name: {
//       firstName: "student1",
//       middleName: "student",
//       lastName: "Rahsel",
//     },
//     email: "student2@gmail.com",
//     gender: "male",
//     dateOfBirth: "2000-01-15",
//     contactNo: "12345",
//     emergencyContactNo: "0987654321",
//     bloodGroup: "O+",
//     presentAddress: "123 Main Street, Springfield",
//     permanentAddress: "456 Elm Street, Springfield",
//     guardian: {
//       fatherName: "Richard Doe",
//       fatherOccupation: "Engineer",
//       fatherContactNo: "1234512345",
//       motherName: "Jane Doe",
//       motherOccupation: "Teacher",
//       motherContactNo: "6789067890",
//     },
//     localGauardian: {
//       name: "Uncle Bob",
//       occupation: "Businessman",
//       contactNo: "1122334455",
//       address: "789 Maple Street, Springfield",
//     },
//     admissionSemester: "676d9ff98e455073c7b01f1f",
//     academicDepartment: "676d9f738e455073c7b01f1c",
//   },
// };

// this is only for development
const studentDefaultValues = {
  name: {
    firstName: "student1",
    middleName: "student",
    lastName: "Rahsel",
  },
  // email: "student2@gmail.com",
  gender: "male",
  // dateOfBirth: "2000-01-15",
  contactNo: "12345",
  emergencyContactNo: "0987654321",
  bloodGroup: "O+",
  presentAddress: "123 Main Street, Springfield",
  permanentAddress: "456 Elm Street, Springfield",
  guardian: {
    fatherName: "Richard Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "1234512345",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContactNo: "6789067890",
  },
  localGauardian: {
    name: "Uncle Bob",
    occupation: "Businessman",
    contactNo: "1122334455",
    address: "789 Maple Street, Springfield",
  },
  admissionSemester: "676da0438e455073c7b01f22",
  academicDepartment: "676d9f738e455073c7b01f1c",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log(data, error);

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);
  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const departmentOptions = dData?.data?.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating.....");
    const studentData = {
      password: "student123",
      student: data,
    };
    console.log(data.image);
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    try {
      const res = (await addStudent(formData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Student created successfully!", {
          id: toastId,
        });
        // navigate to academic semester page
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
    addStudent(formData);

    //! This is for development
    //! Just for checking
    console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGauardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGauardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGauardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGauardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
