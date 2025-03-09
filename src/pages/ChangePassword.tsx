import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { TResponse } from "../types/global";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logOut());
      navigate("/login");
    }
  };
  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="oldPassword" label="Old Password" />
          <PHInput type="text" name="newPassword" label="New Password" />
          <Button htmlType="submit">Changed</Button>
        </PHForm>
      </Row>
    </div>
  );
};

export default ChangePassword;
