import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/orders/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>

      {orders.map((o) => (
        <div key={o.id} className="border p-4 mb-3 rounded">
          <p>ID: {o.id}</p>
          <p>Tổng: {o.total}$</p>
          <p>Trạng thái: {o.status}</p>
        </div>
      ))}
    </div>
  );
}