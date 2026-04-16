import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const token = localStorage.getItem("token");

  // ================= FETCH ORDERS =================
  const fetchOrders = () => {
    fetch("http://localhost:5000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ORDERS:", data);
        setOrders(data);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= UPDATE STATUS =================
  const handleStatusChange = async (id, status) => {
    await fetch(`http://localhost:5000/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchOrders();
  };

  // ================= VIEW DETAIL =================
  const handleView = async (id) => {
    setSelectedId(id);

    const res = await fetch(`http://localhost:5000/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setDetails(data);
  };

  // ================= STATUS STYLE =================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Confirmed":
        return "bg-blue-100 text-blue-600";
      case "Shipping":
        return "bg-purple-100 text-purple-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-6 text-pink-500">
          Quản lý đơn hàng
        </h1>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow border border-pink-100">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    Không có đơn hàng
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b hover:bg-pink-50 transition"
                  >
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.email}</td>

                    {/* 💰 TOTAL */}
                    <td className="text-pink-500 font-semibold">
                      ${Number(o.total || 0).toLocaleString()}
                    </td>

                    {/* STATUS */}
                    <td className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                          o.status
                        )}`}
                      >
                        {o.status || "Pending"}
                      </span>

                      <select
                        value={o.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(o.id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Shipping</option>
                        <option>Completed</option>
                      </select>
                    </td>

                    {/* ACTION */}
                    <td>
                      <button
                        onClick={() => handleView(o.id)}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-lg"
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= DETAIL ================= */}
        {selectedId && (
          <div className="bg-white p-6 mt-6 rounded-2xl shadow border border-pink-100">
            <h2 className="font-semibold mb-4 text-pink-500">
              Chi tiết đơn #{selectedId}
            </h2>

            {details.length === 0 ? (
              <p className="text-gray-400">Không có dữ liệu</p>
            ) : (
              details.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 mb-4 border-b pb-2"
                >
                  {/* IMAGE */}
                  <img
                    src={d.image || "https://via.placeholder.com/80"}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />

                  {/* NAME */}
                  <p className="flex-1 font-medium">{d.name}</p>

                  {/* QUANTITY */}
                  <p className="text-gray-500">x{d.quantity}</p>

                  {/* PRICE */}
                  <p className="text-pink-500 font-semibold">
                    ${Number(d.price || 0).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}