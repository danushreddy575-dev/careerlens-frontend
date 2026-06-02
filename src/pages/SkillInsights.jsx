import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SkillBar from "../components/SkillBar";
import SkillCard from "../components/SkillCard";
import RecommendationCard from "../components/RecommendationCard";

import {
  getSkillGap,
  getRecommendations
} from "../services/skillService";

export default function SkillInsights() {

  const [gap, setGap] = useState(null);
  const [rec, setRec] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {

      // temporary user skills
      const userSkills = [
        "javascript",
        "react",
        "nodejs",
        "mongodb"
      ];

      const skillRes =
        await getSkillGap(
          userSkills
        );

      const recRes =
        await getRecommendations(
          userSkills
        );

      setGap(
        skillRes.data[0]
      );

      setRec(
        recRes.data.recommendations
      );

    } catch (err) {

      console.log(err);

      setError(
        "Failed to load insights"
      );

    }
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!gap) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>
          Skill Insights
        </h1>

        <SkillBar
          percent={
            gap.matchPercentage
          }
        />

        <SkillCard
          title="Matched Skills"
          skills={
            gap.matched
          }
          type="good"
        />

        <SkillCard
          title="Missing Skills"
          skills={
            gap.missing
          }
          type="bad"
        />

        <h2>
          Recommendations
        </h2>

        {rec.map((job) => (
          <RecommendationCard
            key={job.jobId}
            job={{
              ...job,
              finalScore:
                job.recommendationScore
            }}
          />
        ))}

      </div>

    </>
  );
}