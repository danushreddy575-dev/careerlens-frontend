export default function RecommendationCard({
  job
}) {
  const openLink = () => {
    if (!job.applyLink) return;

    window.open(
      job.applyLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="recommendation-card">

      <h3>
        {job.title}
      </h3>

      <p className="muted">
        {job.company}
      </p>

      {
        job.location && (
          <p className="muted recommendation-location">
            {job.location}
          </p>
        )
      }

      <div className="recommendation-meta">
        <span className="score-chip">
          Score {job.finalScore}
        </span>

        {
          job.sourceType && (
            <span className="source-badge">
              {
                job.sourceType === "email"
                  ? "Inbox"
                  : "Market"
              }
            </span>
          )
        }

        {
          job.applySource && (
            <span className="source-badge">
              {job.applySource}
            </span>
          )
        }
      </div>

      {
        job.whyRecommended && (
          <p className="recommendation-reason">
            {job.whyRecommended}
          </p>
        )
      }

      {
        job.matched?.length > 0 && (
          <div className="mini-chip-row">
            {
              job.matched
                .slice(0, 4)
                .map(skill => (
                  <span
                    className="mini-chip"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))
            }
          </div>
        )
      }

      {
        job.applyLink && (
          <button
            className="btn btn-primary recommendation-apply"
            onClick={openLink}
          >
            {
              job.sourceType === "email"
                ? "Open Opportunity"
                : "Apply Now"
            }
          </button>
        )
      }

    </div>
  );
}
