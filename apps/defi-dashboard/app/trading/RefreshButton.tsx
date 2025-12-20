'use client';

/**
 * Client component for refreshing the page
 * Separated to keep the parent page as a server component
 */
export function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="mt-2 rounded-lg bg-green-positive px-4 py-2 text-sm font-semibold text-white
        transition duration-200
        hover:bg-green-positive/90"
    >
      Refresh Data
    </button>
  );
}
