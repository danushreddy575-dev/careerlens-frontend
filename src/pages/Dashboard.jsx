import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

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

export default function Dashboard() {
  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const loadDashboard =
    async () => {
      try {
        const data =
          await getDashboardSummary();

        setSummary(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="skeleton-page">
            Loading dashboard...
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
            Personal command center
          </p>
          <h1>
            CareerLens Dashboard
          </h1>
          <p>
            Track market coverage, inbox opportunities, source quality, and the next action that matters most.
          </p>
        </section>

        <div className="analytics-grid">
          <StatCard
            title="Market Jobs"
            value={summary.marketJobs || 0}
            detail="Live opportunities across connected sources"
          />

          <StatCard
            title="Top Location"
            value={
              summary.market?.topLocation?.location ||
              "No jobs yet"
            }
            detail={`${summary.market?.topLocation?.count || 0} matching jobs`}
          />

          <StatCard
            title="Apply Coverage"
            value={`${summary.market?.applyLinkCoverage?.percentage || 0}%`}
            detail={`${summary.market?.applyLinkCoverage?.withLinks || 0} jobs with apply links`}
          />

          <StatCard
            title="Inbox Opportunities"
            value={summary.inbox?.trusted || 0}
            detail={`${summary.inbox?.highPriority || 0} high priority`}
          />
        </div>

        <div className="analytics-grid two-column">
          <div className="panel">
            <h3>
              Job Source Mix
            </h3>

            {
              summary.market
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
              summary.market
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
              summary.inbox
                ?.gmailConnected ? (
                <>
                  <p>
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

                  <p>
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
              {summary.recommendedAction}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
