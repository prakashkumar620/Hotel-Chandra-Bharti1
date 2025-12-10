import { useEffect, useState } from "react";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const load = async () => {
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    };
    load();
  }, [token, navigate]);

  const deleteUser = async (id) => {
    await API.delete(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-yellow-400">Users</h1>
        <table className="w-full bg-black/70 border border-yellow-500/40 rounded">
          <thead>
            <tr className="border-b border-yellow-500/40">
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-yellow-500/20">
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="text-red-400 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="2" className="p-3 text-center text-gray-200">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
