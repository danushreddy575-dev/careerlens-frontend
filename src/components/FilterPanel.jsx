export default function FilterPanel({
  location,
  setLocation,
  experienceLevel,
  setExperienceLevel
}) {
  return (
    <div className="job-filters">
      <label className="field">
        <span>
          Location priority
        </span>
        <input
          placeholder="Bangalore, Hyderabad, Pune..."
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />
      </label>

      <label className="field">
        <span>
          Experience
        </span>
        <select
          value={experienceLevel}
          onChange={(e) =>
            setExperienceLevel(e.target.value)
          }
        >
          <option value="">
            All Experience
          </option>
          <option value="Internship">
            Internship
          </option>
          <option value="Entry Level">
            Entry Level
          </option>
          <option value="Junior">
            Junior
          </option>
          <option value="Mid Level">
            Mid Level
          </option>
          <option value="Senior">
            Senior
          </option>
          <option value="Lead/Manager">
            Lead/Manager
          </option>
          <option value="Not Specified">
            Not Specified
          </option>
        </select>
      </label>
    </div>
  );
}
