// List of available status filters.
const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

/**
 * FilterTabs Component
 * Displays tabs for filtering tasks by status.
 *
 * @param {Object} props - Component props.
 * @param {string} props.selected - The currently selected filter.
 * @param {(value: string) => void} props.onChange - Runs when a filter is selected.
 */
export default function FilterTabs({ selected, onChange }) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter by status">
      {STATUS_OPTIONS.map((status) => (
        <button
          key={status.value}
          onClick={() => onChange(status.value)}
          // Disable the selected filter since it is already active.
          disabled={selected === status.value}
          role="tab"
          aria-selected={selected === status.value}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}
