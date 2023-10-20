import { Link, Outlet } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AuthContext } from "../App";
import Cookies from "js-cookie";

const Navbar = () => {
  const [user, SetUser] = useContext(AuthContext);
  return (
    <>
      <div className="w-full font-poppins">
        <div className="flex justify-between max-w-6xl mx-auto py-4 ">
          <div className="font-bold text-2xl">
            <Link to="/"> Bookstore </Link>
          </div>
          {user.email ? (
            <div className="flex gap-4 align-middle">
              <p className="my-auto text-red-500">Hi,{user.firstName}</p>
              <Link className="my-auto" to="/users">
                Users
              </Link>
              <Link className="my-auto" to="/books">
                Books
              </Link>
              <Link className="my-auto" to="/category">
                Category
              </Link>
              <Link className="my-auto" to="/cart">
                Cart
              </Link>
              <Button
                onClick={() => {
                  Cookies.remove("id");
                  SetUser({});
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 align-middle">
              <Link to="/register"> Register </Link>
              <Link to="/login"> Login </Link>
              <Link to="/about"> About </Link>
            </div>
          )}
        </div>
        <div className="w-full text-center flex gap-2 justify-center bg-gray-100 py-5 align-middle">
          <Input
            className="max-w-md bg-transparent border-gray-400"
            placeholder="what are you looking for.."
          />
          <Button size="lg">Search</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
