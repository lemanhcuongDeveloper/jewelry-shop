import { useEffect, useState } from "react";

export default function Cart({ showCart, setShowCart }) {
  const [cart, setCart] = useState([]);

  
  const fetchCart = () => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/carts", {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    
    .then((data) => setCart(data));
};

  // useEffect(() => {
  //   if (showCart) fetchCart();
  // }, [showCart]);
useEffect(() => {
  if (showCart) fetchCart();

  const handleUpdate = () => fetchCart();

  window.addEventListener("cartUpdated", handleUpdate);

  return () => {
    window.removeEventListener("cartUpdated", handleUpdate);
  };
}, [showCart]);
 const updateQuantity = (id, quantity) => {
  if (quantity < 1) return;

  const token = localStorage.getItem("token");

  fetch(`http://localhost:5000/carts/item/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  }).then(fetchCart);
};

const deleteItem = (id) => {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5000/carts/item/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  }).then(fetchCart);
};
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!showCart) return null;
const handleCheckout = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  alert(data.message);

  fetchCart(); // reload cart
};
  return (
    <>
      
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => setShowCart(false)}
      />

      {/* Cart */}
      <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-2xl z-50 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold">Giỏ hàng</h2>

          <button
            onClick={() => setShowCart(false)}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              Chưa có sản phẩm
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 mb-4 border-b pb-3"
              >
                 <img src={item.image} className="w-16 h-16 rounded" /> 

                <div className="flex-1">
                  <h3 className="text-sm font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-pink-500 text-sm">
                    {item.price}$
                  </p>

                  {/* quantity */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* delete */}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="p-5 border-t">
            <p className="flex justify-between font-semibold mb-3">
              <span>Tổng</span>
              <span className="text-pink-500">{total}$</span>
            </p>

           <button
  onClick={handleCheckout}
  className="w-full bg-pink-500 text-white py-3 rounded-lg"
>
  Thanh toán
</button>
          </div>
        )}
      </div>
    </>
  );
}