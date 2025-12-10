import { useState } from "react";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AddMenuItem() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/menu", { ...form, price: Number(form.price) }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/admin/menu");
  };

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-yellow-400">Add Menu Item</h1>
        <form onSubmit={submit} className="bg-black/70 border border-yellow-500/40 p-4 rounded space-y-3">
          <input
            className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
            placeholder="Item Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <button className="bg-green-600 hover:bg-green-500 text-white w-full p-2 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
