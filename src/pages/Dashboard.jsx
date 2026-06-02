import { useEffect, useState }
from "react";

import Navbar
from "../components/Navbar";

import {
  getDashboardSummary
}
from "../services/dashboardService";

export default function Dashboard() {

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const data =
          await getDashboardSummary();

        setSummary(data);

      }

      catch (err) {

        console.log(err);

      }

      finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (
      <>
        <Navbar />
        <div className="container">
          Loading...
        </div>
      </>
    );

  }

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>
          CareerLens Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >

          <div className="card">
            <h3>Applications</h3>

            <p>
              Applied:
              {" "}
              {
                summary.applications
                  .applied
              }
            </p>

            <p>
              Interviews:
              {" "}
              {
                summary.applications
                  .interviews
              }
            </p>

            <p>
              Accepted:
              {" "}
              {
                summary.applications
                  .accepted
              }
            </p>

            <p>
              Rejected:
              {" "}
              {
                summary.applications
                  .rejected
              }
            </p>

          </div>

          <div className="card">

            <h3>
              Inbox Health
            </h3>

            <p>
              Trusted:
              {" "}
              {
                summary.inbox
                  .trusted
              }
            </p>

            <p>
              Review:
              {" "}
              {
                summary.inbox
                  .review
              }
            </p>

            <p>
              Filtered:
              {" "}
              {
                summary.inbox
                  .filtered
              }
            </p>

          </div>

          <div className="card">

            <h3>
              Market Jobs
            </h3>

            <p>
              {
                summary.marketJobs
              }
            </p>

          </div>

        </div>

        <div
          style={{
            marginTop: "30px"
          }}
        >

          <h2>
            Recent Activity
          </h2>

          {
            summary.recentActivity
              ?.map(
                activity => (

                  <div
                    key={
                      activity._id
                    }
                  >

                    <strong>
                      {
                        activity.company
                      }
                    </strong>

                    {" - "}

                    {
                      activity.role
                    }

                    {" - "}

                    {
                      activity.status
                    }

                  </div>

                )
              )
          }

        </div>

      </div>
    </>
  );

}