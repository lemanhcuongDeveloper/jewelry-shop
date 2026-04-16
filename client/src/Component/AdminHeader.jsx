export default function AdminHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h1 className="font-semibold text-lg">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-600">{user?.name}</span>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>

    </div>
  );
}