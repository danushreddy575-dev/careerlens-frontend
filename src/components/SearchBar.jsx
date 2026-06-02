export default function SearchBar({
  value,
  onChange
}) {
  return (
    <input
      className="search"
      placeholder="Search jobs..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}