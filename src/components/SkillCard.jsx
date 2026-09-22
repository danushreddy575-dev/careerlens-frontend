export default function SkillCard({
  title,
  skills,
  type
}) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div>
        {skills?.map((skill) => (
          <span
            key={skill}
            className={
              `skill-chip ${type}`
            }
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
