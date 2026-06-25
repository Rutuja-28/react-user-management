import { Routes, Route, Navigate } from "react-router-dom";

import UserList from "../pages/UserList";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import UserDetails from "../pages/UserDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/users" />}
      />

      <Route
        path="/users"
        element={<UserList />}
      />

      <Route
        path="/users/add"
        element={<AddUser />}
      />

      <Route
        path="/users/edit/:id"
        element={<EditUser />}
      />

      <Route
        path="/users/:id"
        element={<UserDetails />}
      />
    </Routes>
  );
}

export default AppRoutes;