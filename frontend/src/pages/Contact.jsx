import { useState } from "react";
import { API } from "../utils/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/contact", form);
    alert("Message sent!");
    setForm({ name: "", email: "", mobile: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">Contact Us</h1>
      <form onSubmit={submit} className="space-y-3 bg-black/70 border border-yellow-500/40 p-4 rounded">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={form.mobile}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <textarea
          placeholder="Message"
          value={form.message}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded h-24"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button className="bg-blue-600 hover:bg-blue-500 text-white w-full p-2 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}
