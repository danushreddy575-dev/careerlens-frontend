import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

import {
  getAnalytics
} from "../services/analyticsService";

const MetricCard = ({
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

export default function Analytics() {
  const [data, setData] =
    useState(null);

  async function load() {
    const res =
      await getAnalytics();

    setData(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="skeleton-page">
            Loading analytics...
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
            Analytics
          </h1>
          <p>
            Understand your readiness, market access, inbox quality, and the skills currently moving hiring demand.
          </p>
        </section>

        <div className="analytics-grid">
          <MetricCard
            title="Career Readiness"
            value={`${data.careerReadiness?.score || 0}%`}
            detail="Based on skills, market access, and inbox quality"
          />

          <MetricCard
            title="Apply Link Coverage"
            value={`${data.market?.applyLinkCoverage?.percentage || 0}%`}
            detail={`${data.market?.applyLinkCoverage?.withLinks || 0} jobs have direct apply links`}
          />

          <MetricCard
            title="Inbox Quality"
            value={data.inboxQuality?.trusted || 0}
            detail="Trusted opportunities in your connected inbox"
          />

          <MetricCard
            title="Market Jobs"
            value={data.totalJobs || 0}
            detail="Across JSearch, Adzuna, and saved market sources"
          />
        </div>

        <div className="analytics-grid two-column">
          <div className="panel equal-panel">
            <h3>
              Job Source Mix
            </h3>

            {
              data.market
                ?.sourceBreakdown
                ?.map(item => (
                  <div
                    className="analytics-row"
                    key={item.source}
                  >
                    <span>
                      {item.source}
                    </span>
                    <strong>
                      {item.count} jobs
                    </strong>
                  </div>
                ))
            }
          </div>

          <div className="panel equal-panel scroll-panel">
            <h3>
              Top Hiring Locations
            </h3>

            {
              data.market
                ?.topLocations
                ?.map(item => (
                  <div
                    className="analytics-row"
                    key={item.location}
                  >
                    <span>
                      {item.location}
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
          <div className="panel scroll-panel">
            <h3>
              Trending Skills
            </h3>

            {
              data.skillDemand
                ?.trendingSkills
                ?.map(([skill, count]) => (
                  <div
                    className="analytics-row"
                    key={skill}
                  >
                    <span>
                      {skill}
                    </span>
                    <strong>
                      {count}
                    </strong>
                  </div>
                ))
            }
          </div>

          <div className="panel compact-panel">
            <h3>
              Skills to Learn
            </h3>

            {
              data.skillDemand
                ?.missingSkills
                ?.length ? (
                data.skillDemand
                  .missingSkills
                  .map(skill => (
                    <span
                      className="skill-chip gap"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))
              ) : (
                <p>
                  No major gaps found against current market demand.
                </p>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
