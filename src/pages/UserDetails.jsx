import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    try {
      const users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];

      const foundUser = users.find(
        (u) =>
          String(u.id) === String(id)
      );

      if (foundUser) {
        setUser(foundUser);
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      toast.error(
        "Failed to fetch user"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />

        <div className="text-center mt-20">
          <h2 className="text-2xl text-red-500">
            User Not Found
          </h2>

          <button
            onClick={() =>
              navigate("/users")
            }
            className="mt-5 bg-indigo-600 text-white px-5 py-2 rounded"
          >
            Back to Users
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            User Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500">
                First Name
              </p>

              <h3 className="text-lg font-medium">
                {user.firstName}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Last Name
              </p>

              <h3 className="text-lg font-medium">
                {user.lastName}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Email
              </p>

              <h3 className="text-lg font-medium">
                {user.email}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Phone
              </p>

              <h3 className="text-lg font-medium">
                {user.phone}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Role
              </p>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {user.role}
              </span>
            </div>

          </div>

          <button
            onClick={() =>
              navigate("/users")
            }
            className="mt-8 bg-indigo-600 text-white px-5 py-3 rounded hover:bg-indigo-700"
          >
            Back
          </button>

        </div>
      </div>
    </>
  );
}

export default UserDetails;