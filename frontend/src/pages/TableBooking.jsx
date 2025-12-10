import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const RESTAURANT_WHATSAPP = "919939328151"; // replace with your number

export default function TableBooking() {
  const { items, total } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    guests: "",
    date: "",
    time: "",
    note: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderLines =
      items.length === 0
        ? "No items selected"
        : items
            .map(
              (it, idx) =>
                `${idx + 1}) ${it.name} x ${it.qty} = ₹${it.price * it.qty}`
            )
            .join("\n");

    const msg = `
TABLE BOOKING REQUEST

Name: ${form.name}
Mobile: ${form.mobile}
Guests: ${form.guests}
Date: ${form.date}
Time: ${form.time}

Order:
${orderLines}

Total: ₹${total}

Extra Note:
${form.note || "None"}
    `.trim();

    const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">Table Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-3 bg-black/70 border border-yellow-500/40 p-4 rounded">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={form.mobile}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />
        <input
          type="number"
          placeholder="Number of Guests"
          value={form.guests}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, guests: e.target.value })}
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={form.date}
            className="border border-yellow-700 bg-black/60 text-white p-2 w-1/2 rounded"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="time"
            value={form.time}
            className="border border-yellow-700 bg-black/60 text-white p-2 w-1/2 rounded"
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
        <textarea
          placeholder="Any special request"
          value={form.note}
          className="border border-yellow-700 bg-black/60 text-white p-2 w-full rounded h-24"
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
        <button className="bg-green-600 hover:bg-green-500 text-white w-full p-2 rounded">
          Send WhatsApp Booking
        </button>
      </form>
    </div>
  );
}
