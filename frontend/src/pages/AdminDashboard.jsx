import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-yellow-400">Admin Dashboard</h1>
        <p className="text-gray-200">
          Use the navigation above to manage menu, users, and messages.
        </p>
      </div>
    </div>
  );
}
