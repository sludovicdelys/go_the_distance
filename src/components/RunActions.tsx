import { useState, FC } from 'react';

interface RunActionsProps {
  runId: number;
  onEdit: (runId: number) => void;
  onDelete: (runId: number) => void;
}

const RunActions: FC<RunActionsProps> = ({ runId, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await onDelete(runId);
      setConfirmDelete(false);
      setMenuOpen(false);
    } catch (err) {
      setError('Failed to delete run. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 relative">
      <div className="inline-block text-left">
        <button
          onClick={handleMenuToggle}
          type="button"
          className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          aria-expanded={menuOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">Open options</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        {menuOpen && (
          <div
            onClick={handleMenuClose}
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
              >
                Delete
              </button>
            </div>
            <div className="py-1" role="none">
              <button
                onClick={() => {
                  onEdit(runId);
                  handleMenuClose();
                }}
                className="text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
          <div className="bg-white rounded-md p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
            <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this run? This action cannot be undone.</p>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </td>
  );
};

export default RunActions;