import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./styles/theme";
import Login from "./pages/login/page";

import SharedLayout from "./Components/SharedLayout";
import { createContext, useContext, useEffect, useState } from "react";
import Register from "./pages/register/page";
import BookList from "./pages/books/page";
import Category from "./pages/category/page";
import AddBook from "./pages/books/add/page";
import UsersList from "./pages/users/page";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "./services/constants";
import AddCategory from "./pages/category/add/page";
import CartPage from "./pages/cart/page";

export const AuthContext = createContext({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books",
        element: <BookList />,
      },
      {
        path: "/users",
        element: <UsersList />,
      },
      {
        path: "/books/add",
        element: <AddBook />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/add",
        element: <AddCategory />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <h1>Products page</h1>,
      },
    ],
  },
]);

export default function App() {
  const [user, setUser] = useState({});
  const getUser = async () => {
    if (Cookies.get("id")) {
      const { data } = await axios.get(
        `${API_URL}/api/user/byId?id=${Cookies.get("id")}`
      );
      setUser(data.result);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={[user, setUser]}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
