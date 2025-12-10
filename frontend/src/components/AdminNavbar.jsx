import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="bg-gray-900 text-white p-3 flex gap-4">
      <Link to="/admin/dashboard" className="font-semibold">
        Dashboard
      </Link>
      <Link to="/admin/menu">Menu</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/messages">Messages</Link>
    </nav>
  );
}
