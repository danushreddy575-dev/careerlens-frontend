import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SkillBar from "../components/SkillBar";
import SkillCard from "../components/SkillCard";
import RecommendationCard from "../components/RecommendationCard";
import ErrorBox from "../components/ErrorBox";

import {
  getSkillGap,
  getRecommendations
} from "../services/skillService";

import {
  getDashboardSummary
} from "../services/dashboardService";

const StatCard = ({
  title,
  value,
  detail
}) => (
  <div className="metric-card">
    <p className="metric-label">
      {title}
    </p>

    <h2 className="metric-value">
      {value}
    </h2>

    {
      detail && (
        <p className="metric-detail">
          {detail}
        </p>
      )
    }
  </div>
);

const SkillsToLearnCard = ({
  skills = []
}) => (
  <div className="panel skills-to-learn-panel compact-panel">
    <div className="panel-heading-row">
      <h3>
        Skills to Learn
      </h3>
      <span className="source-badge">
        ML-4
      </span>
    </div>

    {
      skills.length === 0 ? (
        <div className="empty-inline">
          No priority gaps found
        </div>
      ) : (
        <div className="skill-priority-list">
          {skills.slice(0, 8).map(item => (
            <div
              className="skill-priority-row"
              key={item.skill}
            >
              <div>
                <strong>
                  {item.skill}
                </strong>
                <p>
                  {item.reason}
                </p>
              </div>

              <div className="skill-priority-score">
                <span
                  className={
                    `priority-pill ${String(item.priority).toLowerCase()}`
                  }
                >
                  {item.priority}
                </span>
                <small>
                  {item.score}
                </small>
              </div>
            </div>
          ))}
        </div>
      )
    }
  </div>
);

export default function SkillInsights() {

  const [gap, setGap] = useState(null);
  const [rec, setRec] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {

      const [
        skillRes,
        recRes,
        dashboardRes
      ] = await Promise.all([
        getSkillGap(),
        getRecommendations(),
        getDashboardSummary()
      ]);

      setGap(
        Array.isArray(skillRes.data)
          ? skillRes.data[0]
          : skillRes.data
      );

      setRec(
        recRes.data.recommendations
      );

      setSummary(
        dashboardRes
      );

    } catch (err) {

      console.log(err);

      setError(
        "Failed to load insights"
      );

    }
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container">
          <ErrorBox message={error} />
        </div>
      </>
    );
  }

  if (!gap) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="skeleton-page">
            Loading skill insight dashboard...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">

        <section className="page-header">
          <p className="eyebrow">
            Career intelligence
          </p>
          <h1>
            Skill Insight Dashboard
          </h1>
          <p>
            Compare your skills with market demand, track inbox opportunities, and focus on roles that are actually worth opening.
          </p>
        </section>

        <div className="analytics-grid">
          <StatCard
            title="Market Jobs"
            value={summary?.marketJobs || 0}
            detail="Live roles with usable apply links"
          />

          <StatCard
            title="Market Match"
            value={`${gap.matchPercentage}%`}
            detail={`${gap.matched?.length || 0} skills already aligned`}
          />

          <StatCard
            title="Apply Coverage"
            value={`${summary?.market?.applyLinkCoverage?.percentage || 0}%`}
            detail={`${summary?.market?.applyLinkCoverage?.withLinks || 0} jobs with apply links`}
          />

          <StatCard
            title="Inbox Opportunities"
            value={summary?.inbox?.trusted || 0}
            detail={`${summary?.inbox?.highPriority || 0} high priority`}
          />
        </div>

        <section className="panel skill-score-panel">
          <div>
            <p className="metric-label">
              Market match
            </p>
            <h2 className="metric-value">
              {gap.matchPercentage}%
            </h2>
          </div>
          <SkillBar
            percent={
              gap.matchPercentage
            }
          />
        </section>

        <div className="analytics-grid two-column">
          <SkillCard
            title="Matched Skills"
            skills={
              gap.matched
            }
            type="good"
          />

          <SkillsToLearnCard
            skills={
              gap.skillsToLearn || []
            }
          />
        </div>

        <div className="analytics-grid two-column">
          <div className="panel">
            <h3>
              Job Source Mix
            </h3>

            {
              summary
                ?.market
                ?.sourceMix
                ?.map(item => (
                  <div
                    className="analytics-row"
                    key={item.source}
                  >
                    <span>
                      {item.source}
                    </span>
                    <strong>
                      {item.count}
                    </strong>
                  </div>
                ))
            }
          </div>

          <div className="panel">
            <h3>
              Experience Mix
            </h3>

            {
              summary
                ?.market
                ?.experienceMix
                ?.map(item => (
                  <div
                    className="analytics-row"
                    key={item.level}
                  >
                    <span>
                      {item.level}
                    </span>
                    <strong>
                      {item.count}
                    </strong>
                  </div>
                ))
            }
          </div>
        </div>

        <div className="analytics-grid two-column">
          <div className="panel">
            <h3>
              Inbox Email
            </h3>

            {
              summary
                ?.inbox
                ?.gmailConnected ? (
                <>
                  <p className="metric-detail">
                    Connected Gmail
                  </p>

                  <p className="connected-email">
                    <a
                      href={
                        `mailto:${summary.inbox.inboxEmail}`
                      }
                    >
                      {summary.inbox.inboxEmail}
                    </a>
                  </p>

                  <p className="metric-detail">
                    Average opportunity score:{" "}
                    <strong>
                      {summary.inbox.avgOpportunityScore || 0}
                    </strong>
                  </p>
                </>
              ) : (
                <div className="empty-inline">
                  Not Connected
                </div>
              )
            }
          </div>

          <div className="panel action-panel">
            <h3>
              Recommended Action
            </h3>

            <p>
              {summary?.recommendedAction}
            </p>
          </div>
        </div>

        <section className="section-header">
          <h2>
            Recommended Roles
          </h2>
        </section>

        <div className="recommendation-grid">
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

      </div>

    </>
  );
}
