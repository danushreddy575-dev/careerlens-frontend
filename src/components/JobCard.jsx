export default function JobCard({
  job,
  onSave,
  onApply
}) {
  const sourceLabel =
    job.source === "adzuna"
      ? "Adzuna"
      : job.source === "jsearch" ||
        job.source === "JSearch"
        ? "JSearch"
        : job.source || "Manual";

  return (
    <article className="job-card">
      <div className="job-card-main">
        <div>
          <div className="job-card-top">
            <span className="source-badge">
              {sourceLabel}
            </span>
            <span className="pill">
              {job.experienceLevel || "Not Specified"}
            </span>
          </div>

          <h3>
            {job.title}
          </h3>

          <div className="job-meta">
            <span>
              {job.company || "Company not listed"}
            </span>
            <span>
              {job.location || "Location not listed"}
            </span>
          </div>

          {
            job.description && (
              <p className="job-summary">
                {
                  job.description.length > 220
                    ? `${job.description.slice(0, 220)}...`
                    : job.description
                }
              </p>
            )
          }
        </div>

        <div className="job-actions">
          {
            job.applyLink && (
            <button
              className="btn btn-primary"
              onClick={() =>
                onApply(job)
              }
            >
              Apply Now
            </button>
            )
          }

          <button
            className="btn btn-secondary"
            onClick={() => onSave(job._id)}
          >
            Save Job
          </button>
        </div>
      </div>
    </article>
  );
}
