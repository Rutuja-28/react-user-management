function SearchFilter({
  search,
  setSearch,
  role,
  setRole,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        className="border p-3 rounded-lg w-full md:w-52 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">
          All Roles
        </option>

        <option value="admin">
          Admin
        </option>

        <option value="user">
          User
        </option>

        <option value="moderator">
          Moderator
        </option>
      </select>
    </div>
  );
}

export default SearchFilter;