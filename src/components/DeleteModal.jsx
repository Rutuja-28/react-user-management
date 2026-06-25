function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          Delete User
        </h2>

        <p className="text-gray-600">
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeleteModal;