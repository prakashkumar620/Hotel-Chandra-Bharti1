import { useState } from "react";
import { API } from "../utils/api";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/auth/signup", form);
    alert("Signup successful!");
  };

  return (
    <div className="flex justify-center p-6">
      <form onSubmit={submit} className="max-w-sm w-full space-y-4 bg-black/70 border border-yellow-500/40 p-6 rounded">
        <h1 className="text-2xl font-bold text-center text-yellow-400">Signup</h1>

        <input
          type="email"
          required
          placeholder="Gmail"
          value={form.email}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={form.password}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-yellow-500 hover:bg-yellow-400 text-black p-2 w-full rounded">
          Create Account
        </button>
      </form>
    </div>
  );
}
