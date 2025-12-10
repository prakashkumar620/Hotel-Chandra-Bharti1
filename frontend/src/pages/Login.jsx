import { useState, useContext } from "react";
import { API } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <form onSubmit={submit} className="max-w-sm w-full space-y-4 bg-black/70 border border-yellow-500/40 p-6 rounded">
        <h1 className="text-2xl font-bold text-center text-yellow-400">Login</h1>

        {error && <div className="text-red-400 text-sm p-2 bg-red-900/30 rounded">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-yellow-500 hover:bg-yellow-400 text-black p-2 w-full rounded">
          Login
        </button>

        <Link to="/forgot-password" className="text-yellow-300 text-sm block text-center">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
