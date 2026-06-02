export default function JobCard({ job, onSave }) {
  return (
    <div className="card">
      <h3>{job.title}</h3>

      <p>{job.company}</p>

      <p>{job.location}</p>

      <button onClick={() => onSave(job._id)}>
        Save
      </button>
    </div>
  );
}