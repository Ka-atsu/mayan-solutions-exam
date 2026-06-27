const STATUS_OPTIONS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

export default function FilterTabs({ selected, onChange }) {
  return (
    <div className="filter-tabs">
      {STATUS_OPTIONS.map((status) => (
        <button
          key={status.value}
          onClick={() => onChange(status.value)}
          disabled={selected === status.value}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}
