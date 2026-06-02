export default function SkillBar({
  percent
}) {
  return (
    <div className="progress">

      <div
        className="fill"
        style={{
          width: `${percent}%`
        }}
      >
        {percent}%
      </div>

    </div>
  );
}