import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";

import { getJobs } from "../services/jobService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadJobs();
  }, [page]);

  async function loadJobs() {
    try {
      setLoading(true);

      const res = await getJobs(page);

      setJobs(res.data.jobs || res.data);

      setError("");
    } catch {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  function saveJob(id) {
    console.log("Saved:", id);
  }

  const filtered = jobs.filter((job) => {
    const title =
      job.title?.toLowerCase() || "";

    const location =
      job.location?.toLowerCase() || "";

    return (
      title.includes(search.toLowerCase()) &&
      (filter ? location.includes(filter) : true)
    );
  });

  return (
    <>
      <Navbar />

      <div className="container">

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <FilterPanel
          filter={filter}
          setFilter={setFilter}
        />

        {loading && <Loader />}

        {error && (
          <ErrorBox message={error} />
        )}

        {filtered.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onSave={saveJob}
          />
        ))}

        <Pagination
          page={page}
          setPage={setPage}
        />

      </div>
    </>
  );
}