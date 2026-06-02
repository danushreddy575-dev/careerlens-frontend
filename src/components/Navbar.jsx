import { Link } from "react-router-dom";

export default function Navbar() {
  function logout() {
    localStorage.removeItem("token");
    window.location = "/login";
  }

  return (
    <nav className="nav">
      <h2>CareerLens</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/Applications">Applications</Link>
        <Link to="/inbox">Inbox Jobs</Link>
        <Link to="/analytics">Analytics</Link>
        <button onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}