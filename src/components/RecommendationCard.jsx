export default function RecommendationCard({
  job
}) {
  return (
    <div className="card">

      <h3>
        {job.title}
      </h3>

      <p>
        {job.company}
      </p>

      <p>
        Score:
        {" "}
        {job.finalScore}
      </p>

    </div>
  );
}