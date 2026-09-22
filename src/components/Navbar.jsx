import {
  useState
} from "react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import AuthModal from "./AuthModal";
import rocketLogo
from "../assets/careerlens-rocket-logo.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const [showAuth,setShowAuth]=
    useState(false);

  const [token,setToken]=
    useState(
      localStorage.getItem("token")
    );

  function logout() {

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");

  setToken(null);

  navigate("/jobs");
}

  return (
    <header className="app-shell">
      <nav className="nav">

      <NavLink
        to="/jobs"
        className="brand"
      >
        <img
          className="brand-logo"
          src={rocketLogo}
          alt="CareerLens rocket logo"
        />
        <span className="brand-copy">
          <strong>
            CareerLens
          </strong>
          <small>
            Launch your career
          </small>
        </span>
      </NavLink>

      <div className="nav-links">

        <NavLink to="/jobs">
          Jobs
        </NavLink>

        {!token ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() =>
                setShowAuth(true)
              }
            >
              Login
            </button>
          </>
        ) : (
          <>
            <NavLink to="/skills">
              Skill Insight Dashboard
            </NavLink>

            <NavLink to="/inbox">
              Inbox Jobs
            </NavLink>

            <NavLink to="/analytics">
              Analytics
            </NavLink>

            <NavLink to="/profile">
              Profile
            </NavLink>

            <button
              className="btn btn-ghost"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

      </div>

      {
        showAuth && (
          <AuthModal
            onClose={() =>
              setShowAuth(false)
            }
            onSuccess={() => {
              setToken(
                localStorage.getItem(
                  "token"
                )
              );
              setShowAuth(false);
            }}
          />
        )
      }

      </nav>
    </header>
  );
}
