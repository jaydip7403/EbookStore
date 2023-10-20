import { useFormik } from "formik";
import { Input } from "../../../Components/ui/input";
import { Button } from "../../../Components/ui/button";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../../../services/constants";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AddCategory = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [category, setCategory] = useState({});

  const fetchCategory = async () => {
    if (!id) return;
    const { data } = await axios.get(`${API_URL}/api/category/byId?id=${id}`);
    setCategory(data.result);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const {
    getFieldProps,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    values,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);

      try {
        if (!id) {
          const { data } = await axios.post(`${API_URL}/api/category`, values);
          toast.success("successfully created category", {
            position: "bottom-right",
          });
        } else {
          const { data } = await axios.put(`${API_URL}/api/category`, {
            id,
            name: values.name,
          });
          toast.success("successfully updated category", {
            position: "bottom-right",
          });
        }

        resetForm();
      } catch (error) {
        toast.error("some error occured", { position: "bottom-right" });
      }
    },
  });

  useEffect(() => {
    setValues(category);
  }, [category]);

  return (
    <>
      <h1 className="font-bold text-3xl text-center my-10">Add Category</h1>

      <div className="max-w-xl mx-auto my-10 flex flex-col gap-3">
        <div>
          <label>Category Name</label>
          <Input
            type="text"
            id="name"
            label="name"
            {...getFieldProps("name")}
            className="border border-gray-400"
          />
          {touched.name && errors.name ? (
            <p className="text-red-500">{errors.name}</p>
          ) : null}
        </div>
        <Button
          type="submit"
          className="row-start-4"
          onClick={() => handleSubmit()}
        >
          Create Category
        </Button>
      </div>
    </>
  );
};

export default AddCategory;
