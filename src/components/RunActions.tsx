import { useState, FC } from 'react';

interface RunActionsProps {
  runId: number;
  onEdit: (runId: number) => void;
  onDelete: (runId: number) => void;
}

const RunActions: FC<RunActionsProps> = ({ runId, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
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
                onClick={() => onDelete(runId)}
                className="text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 block w-full text-left px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
              >
                Delete
              </button>
            </div>
            <div className="py-1" role="none">
              <button
                onClick={() => onEdit(runId)}
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
    </td>
  );
};

export default RunActions;