export default function SearchBar({
  value,
  onChange
}) {
  return (
    <label className="field search-field">
      <span>
        Search roles
      </span>
      <input
        className="search"
        placeholder="Frontend, data analyst, cloud..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
