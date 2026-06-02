export default function FilterPanel({
  filter,
  setFilter
}) {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="">All</option>
      <option value="remote">Remote</option>
      <option value="hybrid">Hybrid</option>
      <option value="onsite">Onsite</option>
    </select>
  );
}