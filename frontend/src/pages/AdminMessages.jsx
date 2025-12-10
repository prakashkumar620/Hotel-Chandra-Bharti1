import { useEffect, useState } from "react";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminMessages() {
  const [msgs, setMsgs] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const load = async () => {
      const res = await API.get("/admin/messages", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsgs(res.data);
    };
    load();
  }, [token, navigate]);

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-yellow-400">Contact Messages</h1>
        <div className="space-y-3">
          {msgs.map((m) => (
            <div key={m._id} className="bg-black/70 border border-yellow-500/40 rounded p-3">
              <div className="font-semibold text-yellow-200">
                {m.name} ({m.email}) – {m.mobile}
              </div>
              <div className="text-sm text-gray-300">{m.subject}</div>
              <p className="mt-1 text-gray-100">{m.message}</p>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(m.date).toLocaleString()}
              </div>
            </div>
          ))}
          {msgs.length === 0 && <p className="text-gray-200">No messages yet.</p>}
        </div>
      </div>
    </div>
  );
}
