import { useState } from "react";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      alert("Admin Login Successful");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center p-6">
      <form onSubmit={submit} className="max-w-sm w-full space-y-4 bg-black/70 border border-yellow-500/40 p-6 rounded">
        <h1 className="text-2xl font-bold text-center text-yellow-400">Admin Login</h1>
        <input
          type="email"
          placeholder="Admin Email"
          value={form.email}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-gray-900 hover:bg-gray-800 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
