import axios from "axios";
import { API_URL } from "./constants";

export const getAllBooks = async () => {
  const { data } = await axios.get(`${API_URL}/api/book/all`);
  console.log(data);
  return data;
};

export const getBookbyId = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/book/byId?id=${id}`);
  return data;
};

export const getAllCategory = async () => {
  const { data } = await axios.get(`${API_URL}/api/category/all`);
  console.log(data);
  return data;
};

export const DeleteBookbyId = async (id) => {
  const { data } = await axios.delete(`${API_URL}/api/book?id=${id}`);
  console.log(data);
  return data;
};
export const DeleteCategorybyId = async (id) => {
  const { data } = await axios.delete(`${API_URL}/api/category?id=${id} `);
  console.log(data);
  return data;
};
