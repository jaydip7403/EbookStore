import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster as Toaster2 } from "react-hot-toast";
import { Toaster } from "./ui/toaster";

const SharedLayout = () => {
  return (
    <>
      <Toaster2 />
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
