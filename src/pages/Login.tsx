/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import PHForm from "../components/form/PHForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data)
    // const toastId = toast.loading("Logging in");
    // try {
    //   const userInfo = {
    //     id: data.id,
    //     password: data.password,
    //   };
    //   const res = await login(userInfo).unwrap();
    //   const user = verifyToken(res.data.accessToken) as TUser;

    //   dispatch(setUser({ user: user, token: res.data.accessToken }));
    //   toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
    //   navigate(`/${user?.role}/dashboard`);
    // } catch (error) {
    //   toast.error("Something went wrong", { id: toastId, duration: 2000 });
    // }
  };

  return (
    <div>
      <PHForm  onSubmit={onSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input {...register("id")} type="text" id="id" name="id" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </div>
  );
};

export default Login;
