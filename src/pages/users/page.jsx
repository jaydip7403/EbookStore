import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { Button } from "../../Components/ui/button";
import axios from "axios";
import { API_URL } from "../../services/constants";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await axios.get(`${API_URL}/api/user/all`);
    setUsers(data.result.slice(0, 20));
    setLoading(false);
  };
  const DeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${API_URL}/api/user?id=${id}`);
      toast.success("successfully deleted user", {
        position: "bottom-right",
      });
      setChange((prev) => !prev);
    } catch (error) {
      toast.error("can't delete user", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [change]);

  if (!Cookies.get("id")) return <Navigate to={"/login"} />;
  return (
    <>
      <h1 className="font-bold text-3xl text-center my-10">User</h1>

      <Table className="max-w-4xl overflow-hidden mx-auto  ">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>FirstName</TableHead>
            <TableHead>LastName</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.firstName}</TableCell>
              <TableCell>{p.lastName}</TableCell>
              <TableCell>{p.role}</TableCell>
              <TableCell className="gap-2 flex w-fit text-right">
                <Button
                  onClick={() => DeleteUser(p.id)}
                  variant="outline"
                  className="border-red-600 bg-red-50"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersList;
