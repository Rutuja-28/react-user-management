import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import Navbar from "./Navbar";

function UserForm({ edit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "user",
  });

  useEffect(() => {
    if (edit) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const users =
        JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
    (u) => String(u.id) === String(id)
);

      if (user) {
        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role || "user",
        });
      }
    } catch (error) {
      toast.error("Failed to load user");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (form.firstName.trim().length < 3) {
      return "First name must be at least 3 characters";
    }

    if (!form.lastName.trim()) {
      return "Last name is required";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      return "Please enter a valid email";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      return "Phone number must contain 10 digits";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      if (edit) {

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const updatedUsers = users.map(
      (user) =>
        String(user.id) === String(id)
          ? {
              ...user,
              ...form,
            }
          : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    toast.success(
      "User updated successfully"
    );
} else {
        await api.post("/add", form);

        const users =
          JSON.parse(
            localStorage.getItem("users")
          ) || [];

        const newUser = {
          id: crypto.randomUUID(),
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          role: form.role,
        };

        const updatedUsers = [
          newUser,
          ...users,
        ];

        localStorage.setItem(
          "users",
          JSON.stringify(updatedUsers)
        );

        toast.success(
          "User added successfully"
        );
      }

      navigate("/users");
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            {edit ? "Edit User" : "Add User"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">
                Role
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
                </option>

                <option value="moderator">
                  Moderator
                </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : edit
                ? "Update User"
                : "Add User"}
            </button>
          </form>

        </div>
      </div>
    </>
  );
}

export default UserForm;