import {
  useState
} from "react";

import {
  createPortal
} from "react-dom";

import {
  login,
  register
} from "../services/authService";

export default function AuthModal({
  onSuccess,
  onClose,
  showClose = true
}) {
  const [mode, setMode] =
    useState("login");

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      mobileNumber: "",
      skills: "",
      preferredLocation: "",
      preferredJobType: "Full Time"
    });

  const [error, setError] =
    useState("");

  const updateField =
    (field, value) => {
      setForm({
        ...form,
        [field]: value
      });
    };

  const saveUserSession = (data) => {
    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "userId",
      data.user.id
    );

    localStorage.setItem(
      "userName",
      data.user.name
    );

    localStorage.setItem(
      "userEmail",
      data.user.email
    );
  };

  const submitLogin = async () => {
    try {
      setError("");

      const res =
        await login({
          email: form.email,
          password: form.password
        });

      saveUserSession(res.data);

      onSuccess?.();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Login failed"
      );
    }
  };

  const submitRegister = async () => {
    try {
      setError("");

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        mobileNumber:
          form.mobileNumber,
        skills:
          form.skills
            .split(",")
            .map(skill =>
              skill.trim()
            )
            .filter(Boolean),
        preferredLocation:
          form.preferredLocation,
        preferredJobType:
          form.preferredJobType
      });

      setMode("login");
      setError(
        "Registration successful. Please login."
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return createPortal(
    <div className="modal-backdrop">
      <div className="auth-modal">
        {
          showClose && (
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              X
            </button>
          )
        }

        <div className="auth-header">
          <span className="brand-mark">
            CL
          </span>
          <div>
            <p className="eyebrow">
              CareerLens account
            </p>
            <h2>
              {
                mode === "login"
                  ? "Welcome back"
                  : "Create your account"
              }
            </h2>
          </div>
        </div>

        {
          mode === "register" && (
            <div className="auth-register-grid">
            <label className="field">
              <span>
                Name
              </span>
              <input
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                )
              }
            />
            </label>
            <label className="field">
              <span>
                Mobile Number
              </span>
              <input
                placeholder="9876543210"
                value={
                  form.mobileNumber
                }
                onChange={(e) =>
                  updateField(
                    "mobileNumber",
                    e.target.value
                  )
                }
              />
            </label>
            </div>
          )
        }

        <label className="field">
          <span>
            Email
          </span>
          <input
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) =>
              updateField(
                "email",
                e.target.value
              )
            }
          />
        </label>

        {
          mode === "register" && (
            <>
              <label className="field">
                <span>
                  Skills
                </span>
                <input
                  placeholder="React, Node.js, SQL"
                  value={form.skills}
                  onChange={(e) =>
                    updateField(
                      "skills",
                      e.target.value
                    )
                  }
                />
              </label>

              <div className="auth-register-grid">
                <label className="field">
                  <span>
                    Location
                  </span>
                  <input
                    placeholder="Hyderabad"
                    value={
                      form.preferredLocation
                    }
                    onChange={(e) =>
                      updateField(
                        "preferredLocation",
                        e.target.value
                      )
                    }
                  />
                </label>

                <label className="field">
                  <span>
                    Preferred Job Type
                  </span>
                  <select
                    value={
                      form.preferredJobType
                    }
                    onChange={(e) =>
                      updateField(
                        "preferredJobType",
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Internship
                    </option>
                    <option>
                      Full Time
                    </option>
                    <option>
                      Part Time
                    </option>
                    <option>
                      Remote
                    </option>
                  </select>
                </label>
              </div>
            </>
          )
        }

        <label className="field">
          <span>
            Password
          </span>
          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              updateField(
                "password",
                e.target.value
              )
            }
          />
        </label>

        {
          error && (
            <p className="error">
              {error}
            </p>
          )
        }

        <button
          className="btn btn-primary full-width"
          onClick={
            mode === "login"
              ? submitLogin
              : submitRegister
          }
        >
          {
            mode === "login"
              ? "Login"
              : "Register"
          }
        </button>

        {
          mode === "login" ? (
            <p className="auth-switch">
              Not registered yet?{" "}
              <button
                className="link-button"
                onClick={() => {
                  setError("");
                  setMode("register");
                }}
              >
                Register
              </button>
            </p>
          ) : (
            <p className="auth-switch">
              Already registered?{" "}
              <button
                className="link-button"
                onClick={() => {
                  setError("");
                  setMode("login");
                }}
              >
                Login
              </button>
            </p>
          )
        }
      </div>
    </div>,
    document.body
  );
}
