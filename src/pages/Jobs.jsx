import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import AuthModal from "../components/AuthModal";
import {
  saveJob as saveJobApi,
  getSavedJobs,
  removeSavedJob
}
from "../services/jobService";

import { getJobs } from "../services/jobService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [showSaved, setShowSaved] =
  useState(false);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAuth, setShowAuth] =
    useState(false);
  const [
    openSavedAfterLogin,
    setOpenSavedAfterLogin
  ] = useState(false);

  const [search, setSearch] = useState("");
  const [
    locationFilter,
    setLocationFilter
  ] = useState("");
  const [
    experienceLevel,
    setExperienceLevel
  ] = useState("");

  useEffect(() => {
    loadJobs();
  }, [page, locationFilter, experienceLevel]);

  async function loadJobs() {
    try {
      setLoading(true);

      const res =
        await getJobs(
          page,
          locationFilter,
          experienceLevel
        );

      setJobs(res.data.jobs || res.data);

      setError("");
    } catch {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  async function saveJob(jobId) {

  const token =
    localStorage.getItem("token");

  if (!token) {
    setShowAuth(true);
    return;
  }

  try {

    const userId =
      localStorage.getItem("userId");

    await saveJobApi(
      userId,
      jobId
    );

    alert(
      "Job saved successfully"
    );

  } catch (error) {

    alert(
      error?.response?.data?.message ||
      "Failed to save job"
    );

  }
}

function requireAuth() {
  const token =
    localStorage.getItem("token");

  if (!token) {
    setShowAuth(true);
    return false;
  }

  return true;
}

function openSavedJobs() {
  if (!requireAuth()) {
    setOpenSavedAfterLogin(true);
    return;
  }

  loadSavedJobs();
}

function applyToJob(job) {
  if (!requireAuth()) {
    return;
  }

  if (job.applyLink) {
    window.open(
      job.applyLink,
      "_blank",
      "noopener,noreferrer"
    );
  }
}

async function loadSavedJobs() {

  try {

    if (!requireAuth()) {
      return;
    }

    const userId =
      localStorage.getItem(
        "userId"
      );

    const res =
      await getSavedJobs(
        userId
      );

    setJobs(
      res.data.savedJobs || []
    );

    setShowSaved(true);

  } catch {

    setError(
      "Failed to load saved jobs"
    );

  }
}

async function deleteSavedJob(
  jobId
) {

  try {

    const userId =
      localStorage.getItem(
        "userId"
      );

    await removeSavedJob(
      userId,
      jobId
    );

    loadSavedJobs();

  } catch {

    alert(
      "Failed to remove job"
    );

  }
}

  const filtered = jobs.filter((job) => {
    const title =
      job.title?.toLowerCase() || "";

    return title.includes(
      search.toLowerCase()
    );
  });

  return (
    <>
      <Navbar />

      <div className="container">
        <section className="page-hero jobs-hero">
          <div>
            <p className="eyebrow">
              Live job market
            </p>
            <h1>
              Discover opportunities built around your strengths.
            </h1>
            <p>
              Explore verified roles, compare sources, and focus on openings that fit your goals.
            </p>
          </div>

          <div className="hero-panel">
            <span className="metric-label">
              Ready
            </span>
            <strong>
              Start
            </strong>
            <span>
              Your Journey
            </span>
          </div>
        </section>

        <div className="toolbar">
          <div className="segmented">
            <button
              className={!showSaved ? "active" : ""}
              onClick={() => {

                setShowSaved(false);

                loadJobs();

              }}
            >
              All Jobs
            </button>

            <button
              className={showSaved ? "active" : ""}
              onClick={() => {

                openSavedJobs();

              }}
            >
              Saved Jobs
            </button>
          </div>
        </div>

        {
          showAuth && (
            <AuthModal
              onClose={() =>
                setShowAuth(false)
              }
              onSuccess={() => {
                setShowAuth(false)
                if (openSavedAfterLogin) {
                  setOpenSavedAfterLogin(false);
                  loadSavedJobs();
                }
              }}
            />
          )
        }

        <section className="filter-card">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <FilterPanel
            location={locationFilter}
            setLocation={(value) => {
              setPage(1);
              setLocationFilter(value);
            }}
            experienceLevel={experienceLevel}
            setExperienceLevel={(value) => {
              setPage(1);
              setExperienceLevel(value);
            }}
          />

          {
            locationFilter && !showSaved && (
              <p className="hint">
                Prioritizing jobs near{" "}
                <strong>
                  {locationFilter}
                </strong>
              </p>
            )
          }
        </section>

        {loading && <Loader />}

        {error && (
          <ErrorBox message={error} />
        )}

        {
          !loading &&
          !error &&
          filtered.length === 0 && (
            <div className="empty-state">
              <h3>
                No jobs found
              </h3>
              <p>
                Try a different title, location, or experience level.
              </p>
            </div>
          )
        }

        <div className="job-list">
          {filtered.map((job) => (

    <div
      className="saved-job-wrap"
      key={job._id}
    >

    <JobCard
      job={job}
      onSave={saveJob}
      onApply={applyToJob}
    />

    {showSaved && (

      <button
        className="btn btn-danger"
        onClick={() =>
          deleteSavedJob(
            job._id
          )
        }
      >
        Remove Saved Job
      </button>

    )}

  </div>

))}
        </div>

        {
          !showSaved && (
            <Pagination
              page={page}
              setPage={setPage}
            />
          )
        }

      </div>
    </>
  );
}
