import {
  useState,
  useEffect
} from "react";

import Navbar
from "../components/Navbar";

import ActionButton
from "../components/ActionButton";

import {
  getTrustedJobs,
  getReviewJobs,
  getFilteredJobs
} from "../services/inboxService";

export default function InboxJobs() {

  const [activeTab,
    setActiveTab] =
      useState("trusted");

  const [jobs,
    setJobs] =
      useState([]);

  useEffect(() => {

    loadJobs();

  }, [activeTab]);

  const loadJobs =
    async () => {

      let data;

      try {

        switch (activeTab) {

          case "review":
            data =
              await getReviewJobs();
            break;

          case "filtered":
            data =
              await getFilteredJobs();
            break;

          default:
            data =
              await getTrustedJobs();

        }

        setJobs(
          data.jobs || []
        );

      } catch (err) {

        console.error(err);

      }

    };

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>
          Inbox Jobs
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px"
          }}
        >

          <button
            onClick={() =>
              setActiveTab(
                "trusted"
              )
            }
          >
            Trusted
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "review"
              )
            }
          >
            Review
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "filtered"
              )
            }
          >
            Filtered
          </button>

        </div>

        {
          jobs.length === 0 ? (

            <p>
              No jobs found
            </p>

          ) : (

            jobs.map(job => (

              <div
                className="card"
                key={job._id}
                style={{
                  marginBottom: "15px"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center"
                  }}
                >

                  <h3>
                    {job.subject}
                  </h3>

                  <span>
                    {job.type}
                  </span>

                </div>

                <p>
                  <strong>
                    Organization:
                  </strong>{" "}
                  {job.organization}
                </p>

                <p>
                  <strong>
                    Source:
                  </strong>{" "}
                  {job.source}
                </p>

                <p>
                  <strong>
                    Trust:
                  </strong>{" "}
                  {job.trust}
                </p>

                <p>
                  {job.snippet}
                </p>

                <ActionButton
                  link={
                    job.opportunityLink
                  }
                />

              </div>

            ))

          )
        }

      </div>
    </>
  );
}