import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteCategorybyId, getAllCategory } from "../../services/bookservice";
import { useEffect, useState } from "react";
import { Button } from "../../Components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getAllCategory();
    setProducts(data.result);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [change]);
  return (
    <>
      {/* <pre>{JSON.stringify(products[0], null, 2)}</pre> */}

      <h1 className="font-bold text-3xl text-center my-10">Category</h1>
      <div className="max-w-4xl mx-auto flex justify-end">
        <Link to={"/category/add"}>
          <Button className="">Add</Button>
        </Link>
      </div>
      <Table className="max-w-4xl overflow-hidden mx-auto  ">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell className="gap-2 flex w-fit text-right">
                <Link to={`/category/add?id=${p.id}`}>
                  <Button
                    variant="outline"
                    className="border-green-600 bg-green-50"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={async () => {
                    await DeleteCategorybyId(p.id);
                    toast.success("successfully deleted category", {
                      position: "bottom-right",
                    });
                    setChange((prev) => !prev);
                  }}
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

export default Category;
