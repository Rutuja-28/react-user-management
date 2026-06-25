import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import SearchFilter from "../components/SearchFilter";
import DeleteModal from "../components/DeleteModal";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const fetchUsers = async () => {
  try {
    const localUsers = JSON.parse(
      localStorage.getItem("users")
    );

    if (localUsers && localUsers.length > 0) {
      setUsers(localUsers);
      setFilteredUsers(localUsers);
    } else {
      const response = await api.get("?limit=20");

      setUsers(response.data.users);
      setFilteredUsers(response.data.users);

      localStorage.setItem(
        "users",
        JSON.stringify(response.data.users)
      );
    }
  } catch (error) {
    toast.error("Failed to fetch users");
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  fetchUsers();
}, []);

  useEffect(() => {
    let result = users;

    if (search) {
      result = result.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    if (role) {
      result = result.filter(
        (user) => user.role?.toLowerCase() === role.toLowerCase(),
      );
    }

    setFilteredUsers(result);
  }, [search, role, users]);

  //delete user
  const handleDelete = async () => {
    try {
      await api.delete(`/${selectedId}`);

      const updatedUsers =
  users.filter(
    user =>
      user.id !== selectedId
  );

setUsers(updatedUsers);
setFilteredUsers(updatedUsers);

localStorage.setItem(
  "users",
  JSON.stringify(updatedUsers)
);

setUsers(updatedUsers);

setFilteredUsers(
  updatedUsers
);

localStorage.setItem(
  "users",
  JSON.stringify(updatedUsers)
);

      setUsers(updatedUsers);

      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
    }

    setOpenModal(false);
  };

  //show loader
  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  if (
  !loading &&
  filteredUsers.length === 0
) {
  return (
    <>
      <Navbar />

      <div className="text-center mt-20">
        <h2 className="text-2xl text-gray-500">
          No Users Found
        </h2>
      </div>
    </>
  );
}
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          role={role}
          setRole={setRole}
        />

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>

                <th className="text-left">Email</th>

                <th className="text-left">Phone</th>

                <th className="text-left">Role</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {user.firstName} {user.lastName}
                  </td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {user.role || "user"}
                    </span>
                  </td>

                  <td className="text-center space-x-3">
                    <Link
                      to={`/users/${user.id}`}
                      className="text-blue-600 font-medium"
                    >
                      View
                    </Link>

                    <Link
                      to={`/users/edit/${user.id}`}
                      className="text-green-600 font-medium"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedId(user.id);

                        setOpenModal(true);
                      }}
                      className="text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default UserList;
