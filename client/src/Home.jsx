import { useEffect, useState } from "react";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Cart from "./Component/Cart";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addToCart = (product) => {
    const loading = toast.loading("Đang thêm vào giỏ...");

    const token = localStorage.getItem("token");

    if (!token) {
      toast.dismiss(loading);
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    fetch("http://localhost:5000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.dismiss(loading);

        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Đã thêm vào giỏ!");
        }
      })
      .catch(() => {
        toast.dismiss(loading);
        toast.error("❌ Lỗi server!");
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <Toaster position="top-right" />

      <Header toggleCart={toggleCart} />

      <Cart showCart={showCart} setShowCart={setShowCart} />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Jewelry Shop
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow rounded">
              <img src={item.image} className="h-40 w-full" />
              <h2>{item.name}</h2>
              <p>{item.price}$</p>

              <button
                onClick={() => addToCart(item)}
                className="bg-pink-500 text-white w-full py-2 mt-2"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}