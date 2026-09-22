import {
  useState,
  useEffect
} from "react";

import Navbar
from "../components/Navbar";

import ActionButton
from "../components/ActionButton";

import {
  connectGmail,
  getGmailStatus,
  getTrustedJobs,
  getReviewJobs,
  getFilteredJobs,
  syncGmail
} from "../services/inboxService";

export default function InboxJobs() {

  const [activeTab,
    setActiveTab] =
      useState("trusted");

  const [jobs,
    setJobs] =
      useState([]);

  const [gmailStatus,
    setGmailStatus] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  const [notice,
    setNotice] =
      useState("");

  const [syncing,
    setSyncing] =
      useState(false);

  const startGmailConnect =
    async () => {

      if (!gmailStatus?.inboxEmail) {
        window.location.href = "/profile";
        return;
      }

      const data =
        await connectGmail();

      window.location.href =
        data.authUrl;

    };

  const loadStatus =
    async () => {

      try {

        const status =
          await getGmailStatus();

        setGmailStatus(status);

        return status;

      } catch (err) {

        console.error(err);
        return null;

      }

    };

  const loadJobs =
    async () => {

      let data;

      try {

        const status =
          gmailStatus ||
          await loadStatus();

        if (!status?.gmailConnected) {
          setJobs([]);
          return;
        }

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

      } finally {

        setLoading(false);

      }

    };

  const runSync =
    async () => {

      try {
        setSyncing(true);
        setNotice(
          "Syncing Gmail. This may take a moment..."
        );

        const data =
          await syncGmail();

        setNotice(
          `Gmail sync completed. ${data.count || 0} emails checked.`
        );

        await loadStatus();
        await loadJobs();

      } catch (err) {
        console.error(err);
        setNotice(
          err?.response?.data?.message ||
          "Gmail sync failed. Please try again."
        );
      } finally {
        setSyncing(false);
      }

    };

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    if (
      params.get("gmail") ===
      "connected"
    ) {
      setNotice(
        "Gmail connected successfully."
      );
    }

    if (
      params.get("gmail") ===
      "error"
    ) {
      setNotice(
        params.get("message") ||
        "Gmail connection failed."
      );
    }

    loadJobs();

  }, [activeTab]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="skeleton-page">
            Loading inbox jobs...
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
            Gmail opportunity inbox
          </p>
          <h1>
            Inbox Jobs
          </h1>
          <p>
            Review opportunities collected from your connected Gmail account and prioritize trusted conversations.
          </p>
        </section>

        {
          notice && (
            <div className="notice">
              {notice}
            </div>
          )
        }

        {
          !gmailStatus?.gmailConnected ? (

            <div className="empty-state">
              <h3>
                No inbox email connected.
              </h3>

              <p>
                Connect Gmail from your profile to let CareerLens collect job opportunities for this account.
              </p>

              <button
                className="btn btn-primary"
                onClick={
                  startGmailConnect
                }
              >
                Connect Gmail
              </button>
            </div>

          ) : (

          <div className="connection-strip">
              <span>
                Connected Gmail
              </span>
              <a
                href={
                  `mailto:${gmailStatus.inboxEmail}`
                }
              >
                {
                  gmailStatus.inboxEmail
                }
              </a>
              <button
                className="btn btn-secondary"
                onClick={runSync}
                disabled={syncing}
              >
                {
                  syncing
                    ? "Syncing..."
                    : "Sync Gmail"
                }
              </button>
            </div>

          )
        }

        {
          gmailStatus?.gmailConnected && (
            <>

        <div className="toolbar">
          <div className="segmented">

          <button
            className={
              activeTab === "trusted"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "trusted"
              )
            }
          >
            Trusted
          </button>

          <button
            className={
              activeTab === "review"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "review"
              )
            }
          >
            Review
          </button>

          <button
            className={
              activeTab === "filtered"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "filtered"
              )
            }
          >
            Filtered
          </button>

          </div>
        </div>

        {
          jobs.length === 0 ? (

            <div className="empty-state compact">
              <h3>
                No jobs found
              </h3>
              <p>
                Run Gmail sync or check a different inbox category.
              </p>
              <button
                className="btn btn-primary"
                onClick={runSync}
                disabled={syncing}
              >
                {
                  syncing
                    ? "Syncing..."
                    : "Sync Gmail"
                }
              </button>
            </div>

          ) : (

            <div className="inbox-list">
            {
              jobs.map(job => (

              <div
                className="inbox-card"
                key={job._id}
              >

                <div className="inbox-card-head">

                  <h3>
                    {job.subject}
                  </h3>

                  <span className="pill">
                    {job.type}
                  </span>

                </div>

                <div className="inbox-meta-grid">
                  <span>
                    Organization
                    <strong>
                      {job.organization || "Unknown"}
                    </strong>
                  </span>
                  <span>
                    Source
                    <strong>
                      {job.source || "Email"}
                    </strong>
                  </span>
                  <span>
                    Trust
                    <strong>
                      {job.trust || "-"}
                    </strong>
                  </span>
                  <span>
                    Score
                    <strong>
                      {job.opportunityScore ?? 0}
                    </strong>
                  </span>
                  <span>
                    Priority
                    <strong>
                      {job.priority || "LOW"}
                    </strong>
                  </span>
                </div>

                {
                  job.recruiterEmail && (
                    <p className="recruiter-line">
                      {
                        job.recruiterName ||
                        job.recruiterEmail
                      }
                      {" | "}
                      Interactions:
                      {" "}
                      {
                        job.interactionCount || 1
                      }
                    </p>
                  )
                }

                <p className="inbox-snippet">
                  {job.snippet}
                </p>

                <ActionButton
                  link={
                    job.opportunityLink
                  }
                />

              </div>

              ))
            }
            </div>

          )
        }

            </>
          )
        }

      </div>
    </>
  );
}
