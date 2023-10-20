import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import Cookies from "js-cookie";

export default function Login({}) {
  const navigate = useNavigate();

  const [user, SetUser] = useContext(AuthContext);
  const { getFieldProps, handleSubmit, touched, errors, resetForm } = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required"),
      }),
      onSubmit: async (values) => {
        try {
          const { data } = await axios.post(
            `https://book-e-sell-node-api.vercel.app/api/user/login`,
            values
          );
          toast("success", { position: "bottom-right" });
          SetUser(data.result);
          Cookies.set("id", `${data.result.id}`);
          navigate("/");
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.response.data);
            toast(error.response.data.error);
          }
        }
      },
    }
  );

  return (
    <>
      <div className="flex flex-col max-w-xl gap-3 p-4  mx-auto my-20">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <label>Email</label>
        <Input
          type="text"
          id="email"
          label="email"
          {...getFieldProps("email")}
          className="border border-gray-400"
        />
        {touched.email && errors.email ? (
          <p className="text-red-500">{errors.email}</p>
        ) : null}
        <label>Password</label>
        <Input
          type="password"
          id="password"
          label="password"
          {...getFieldProps("password")}
          className="border border-gray-400 "
        />
        {touched.password && errors.password ? (
          <p className="text-red-500">{errors.password}</p>
        ) : null}
        <Button onClick={() => handleSubmit()}>Login</Button>
      </div>
    </>
  );
}
