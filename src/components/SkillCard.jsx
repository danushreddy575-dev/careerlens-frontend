export default function SkillCard({
  title,
  skills,
  type
}) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>
        {skills?.map((skill) => (
          <span
            key={skill}
            className={
              type
            }
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}