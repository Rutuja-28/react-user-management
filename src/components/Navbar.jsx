import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/users" className="flex items-center gap-3">
          <FaUsers className="text-white text-2xl" />

          <h1 className="text-white text-2xl font-bold hover:text-gray-200">
            User Management
          </h1>
        </Link>

        <Link
          to="/users/add"
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
        >
          Add User
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
