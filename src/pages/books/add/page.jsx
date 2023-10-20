import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../../Components/ui/input";
import { Button } from "../../../Components/ui/button";
import { useToast } from "../../../Components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../../services/constants";
import { toast } from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getAllCategory, getBookbyId } from "../../../services/bookservice";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const AddBook = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  let [category, setCategory] = useState([]);
  let [book, setBook] = useState({});

  const fetchCategory = async () => {
    setCategory((await getAllCategory()).result);
  };
  const fetchBook = async () => {
    setBook((await getBookbyId(id)).result);
  };

  useEffect(() => {
    setValues({
      name: book.name,
      description: book.description,
      price: book.price,
      categoryId: book.categoryId,
      base64image: book.base64image,
    });
  }, [book]);
  useEffect(() => {
    fetchCategory();
    if (id) fetchBook();
  }, []);

  const {
    getFieldProps,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    values,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      base64image: "",
    },

    onSubmit: async (values) => {
      let x = new File([values.base64image], values.base64image.name);
      if (x.size > 10000)
        toast.error("please upload file with size less than 10kb", {
          position: "bottom-right",
        });
      console.log(x.size);

      values.base64image = await toBase64(values.base64image);
      console.log(values);
      try {
        if (!id) {
          const { data } = await axios.post(`${API_URL}/api/book/`, values);
          toast.success("successfully added your book", {
            position: "bottom-right",
          });
        } else {
          const { data } = await axios.put(`${API_URL}/api/book/`, {
            id,
            ...values,
          });
          toast.success("successfully updated your book", {
            position: "bottom-right",
          });
        }
      } catch (error) {
        toast.error("couldn't add your book", {
          position: "bottom-right",
        });
      }
    },
  });

  return (
    <>
      <pre>{JSON.stringify(book, null, 2)}</pre>
      <h1 className="font-bold text-3xl text-center my-10">Add Books</h1>

      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-8 my-10">
        <div>
          <label>Name</label>
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
        <div>
          <label>Description</label>
          <Input
            type="text"
            id="description"
            label="description"
            {...getFieldProps("description")}
            className="border border-gray-400"
          />
          {touched.email && errors.email ? (
            <p className="text-red-500">{errors.email}</p>
          ) : null}
        </div>
        <div>
          <label>Price</label>
          <Input
            type="number"
            id="price"
            label="price"
            {...getFieldProps("price")}
            className="border border-gray-400"
          />
          {touched.price && errors.price ? (
            <p className="text-red-500">{errors.price}</p>
          ) : null}
        </div>
        <div>
          <label>Category</label>
          {/* <Input
            type="number"
            id="categoryId"
            label="categoryId"
            {...getFieldProps("categoryId")}
            className="border border-gray-400"
          /> */}
          <Select
            id="categoryId"
            label="categoryId"
            value={parseInt(values.categoryId)}
            // {...getFieldProps("categoryId")}
            onValueChange={(value) => {
              setFieldValue("categoryId", value);
            }}
            defaultValue={parseInt(values.categoryId)}
            className="border border-gray-400"
          >
            <SelectTrigger className="border border-gray-400">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="relative overflow-y-scroll max-h-64">
              {category.map((c) => {
                return (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {touched.categoryId && errors.categoryId ? (
            <p className="text-red-500">{errors.categoryId}</p>
          ) : null}
        </div>
        <div>
          <label>image</label>
          <Input
            type="file"
            id="base64image"
            label="base64image"
            onBlur={getFieldProps("base64image").onBlur}
            className="border border-gray-300"
            onChange={(event) => {
              setFieldValue("base64image", event.currentTarget.files[0]);
            }}
          />
          {touched.base64image && errors.base64image ? (
            <p className="text-red-500">{errors.base64image}</p>
          ) : null}
        </div>
        <Button
          type="submit"
          className="row-start-4"
          onClick={() => handleSubmit()}
        >
          Create Book
        </Button>
      </div>
    </>
  );
};

export default AddBook;
