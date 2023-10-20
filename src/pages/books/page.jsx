import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteBookbyId, getAllBooks } from "../../services/bookservice";
import { useEffect, useState } from "react";
import { Button } from "../../Components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const BookList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getAllBooks();
    setProducts(data.result);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [change]);
  return (
    <>
      {/* <pre>{JSON.stringify(products[0], null, 2)}</pre> */}
      <h1 className="font-bold text-3xl text-center my-10">Books</h1>
      <div className="max-w-4xl mx-auto flex justify-end">
        <Button className="">
          <Link to={"/books/add"}>Add</Link>
        </Button>
      </div>
      <Table className="max-w-5xl mx-auto ">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell className="gap-2 flex">
                <Link to={`/books/add?id=${p.id}`}>
                  <Button
                    variant="outline"
                    className="border-green-600 bg-green-50"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-red-600 bg-red-50"
                  onClick={async () => {
                    await DeleteBookbyId(p.id);
                    toast.success("successfully removed your book", {
                      position: "bottom-right",
                    });
                    setChange((prev) => !prev);
                  }}
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

export default BookList;
