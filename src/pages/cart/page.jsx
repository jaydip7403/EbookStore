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
import { useAuthContext } from "../../App";
import axios from "axios";
import { API_URL } from "../../services/constants";

import { Link } from "react-router-dom";
import { Button } from "../../Components/ui/button";

const CartPage = () => {
  const [user, setUser] = useAuthContext();
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const { data } = await axios.get(`${API_URL}/api/cart?userId=${user.id}`);
    console.log(data);
    setCartItems(data.result);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <>
      {/* <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}
      <h1 className="font-bold text-3xl text-center my-10">Cart</h1>
      <div className="max-w-5xl mx-auto  my-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.bookId}</TableCell>
                <TableCell>{p.book.name}</TableCell>
                <TableCell>{p.book.price}</TableCell>
                <TableCell>{p.book.category}</TableCell>
                <TableCell className="gap-2 flex">
                  <Button
                    variant="outline"
                    className="border-green-600 bg-green-50"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-600 bg-red-50"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>{" "}
      </div>
    </>
  );
};

export default CartPage;
