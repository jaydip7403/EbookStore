import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getAllBooks, getAllCategory } from "../services/bookservice";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";
import { API_URL } from "../services/constants";
import { useAuthContext } from "../App";
import { toast } from "react-hot-toast";

const Home = () => {
  const [user, setUser] = useAuthContext();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getAllBooks();
    setProducts(data.result);
    setCategory((await getAllCategory()).result);
    setLoading(false);
  };

  const AddtoCart = async (id) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/cart`, {
        bookId: id,
        userId: user.id,
        quantity: 1,
      });
      toast.success("successfully added to cart", { position: "bottom-right" });
    } catch (error) {
      toast.error("couldn't add to cart", { position: "bottom-right" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h1 className="text-2xl text-center my-10">loading</h1>;
  return (
    <div className="grid grid-cols-4 max-w-6xl mx-auto gap-3 my-10 font-poppins">
      {products.map((p) => {
        return (
          <Card key={p.id} className="flex flex-col p-3 gap-2 m-1 bg-gray-50">
            <div className="flex flex-col gap-1">
              <img
                src={p.base64image}
                alt="image"
                className="max-h-40 w-full object-contain mb-2"
              />
              <h3 className="font-semibold text-xl">{p.name}</h3>
              <h3 className="text-gray-600 text-sm">{p.category}</h3>
              <h3 className="font-bold text-xl">₹{p.price}</h3>
              <h3>{p.description.substr(0, 50)}...</h3>
            </div>
            <Button className="mt-auto" onClick={() => AddtoCart(p.id)}>
              Add to Cart
            </Button>
          </Card>
        );
      })}
      {/* <pre>{JSON.stringify(products[0], null, 2)}</pre> */}
    </div>
  );
};

export default Home;
