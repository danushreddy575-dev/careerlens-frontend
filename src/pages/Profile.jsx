import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";

import {
  getProfile,
  updateProfile
} from "../services/profileService";

import {
  connectGmail
} from "../services/inboxService";

export default function Profile() {

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      mobileNumber: "",
      skills: [],
      preferredLocation: "",
      preferredJobType: "",
      inboxEmail: "",
      gmailConnected: false,
      gmailConnectedAt: null
    });

  const [skillsText, setSkillsText] =
    useState("");

  const [connecting, setConnecting] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    try {

      const userId =
        localStorage.getItem(
          "userId"
        );

      const res =
        await getProfile(
          userId
        );

      setProfile(res.data);

      setSkillsText(
        (res.data.skills || [])
          .join(", ")
      );

    } catch (error) {

      console.error(
        "Profile load failed",
        error
      );

    }
  }

  async function saveProfile() {

    try {

      const userId =
        localStorage.getItem(
          "userId"
        );

      await updateProfile(
        userId,
        {
          name:
            profile.name,

          skills:
            skillsText
              .split(",")
              .map(skill =>
                skill.trim()
              )
              .filter(Boolean),

          preferredLocation:
            profile.preferredLocation,

          preferredJobType:
            profile.preferredJobType,

          mobileNumber:
            profile.mobileNumber,

          inboxEmail:
            profile.inboxEmail
        }
      );

      alert(
        "Profile updated successfully"
      );

    } catch {

      alert(
        "Failed to update profile"
      );

    }
  }

  async function startGmailConnect() {

    try {

      setConnecting(true);

      const userId =
        localStorage.getItem(
          "userId"
        );

      await updateProfile(
        userId,
        {
          inboxEmail:
            profile.inboxEmail
        }
      );

      const data =
        await connectGmail();

      window.location.href =
        data.authUrl;

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to start Gmail connection"
      );

    } finally {

      setConnecting(false);

    }

  }

  return (
    <>
      <Navbar />

      <div className="container">

        <section className="page-header">
          <p className="eyebrow">
            Account setup
          </p>
          <h1>
            Profile
          </h1>
          <p>
            Keep your skills, preferences, and connected inbox aligned with your job search.
          </p>
        </section>

        <div className="profile-layout">
          <section className="panel form-panel">
            <h3>
              Personal Details
            </h3>

            <label className="field">
              <span>
                Name
              </span>
              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name:
                      e.target.value
                  })
                }
              />
            </label>

            <label className="field">
              <span>
                Email
              </span>
              <input
                value={profile.email}
                disabled
              />
            </label>

            <label className="field">
              <span>
                Mobile Number
              </span>
              <input
                value={
                  profile.mobileNumber || ""
                }
                placeholder="9876543210"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    mobileNumber:
                      e.target.value
                  })
                }
              />
            </label>

            <label className="field">
              <span>
                Skills
              </span>
              <textarea
                rows="5"
                value={skillsText}
                placeholder="React, Node.js, Python, SQL"
                onChange={(e) =>
                  setSkillsText(
                    e.target.value
                  )
                }
              />
            </label>

            <label className="field">
              <span>
                Preferred Location
              </span>
              <input
                value={
                  profile.preferredLocation
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferredLocation:
                      e.target.value
                  })
                }
              />
            </label>

            <label className="field">
              <span>
                Preferred Job Type
              </span>
              <select
                value={
                  profile.preferredJobType
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferredJobType:
                      e.target.value
                  })
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
          </section>

          <section className="panel gmail-panel">

          <h3>
            Inbox Email
          </h3>

          <p>
            Connect the Gmail account that receives recruiter and application emails.
          </p>

          <label className="field">
            <span>
              Gmail address
            </span>
            <input
              value={
                profile.inboxEmail || ""
              }
              placeholder="you@gmail.com"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  inboxEmail:
                    e.target.value
                })
              }
            />
          </label>

          <div className="status-card">
            <span>
              Connection Status
            </span>
            <strong>
            {
              profile.gmailConnected
                ? "Connected"
                : "Not Connected"
            }
            </strong>
          </div>

          {
            profile.gmailConnected && (
              <>
                <div className="connected-email">
                  <span>
                    Connected Gmail
                  </span>
                  <a
                    href={
                      `mailto:${profile.inboxEmail}`
                    }
                  >
                    {
                      profile.inboxEmail
                    }
                  </a>
                </div>

                <p className="muted">
                  <strong>
                    Connected At:
                  </strong>{" "}
                  {
                    profile.gmailConnectedAt
                      ? new Date(
                          profile.gmailConnectedAt
                        ).toLocaleString()
                      : "-"
                  }
                </p>
              </>
            )
          }

          <button
            className="btn btn-primary full-width"
            onClick={
              startGmailConnect
            }
            disabled={connecting}
          >
            {
              connecting
                ? "Connecting..."
                : "Connect Gmail"
            }
          </button>

          </section>
        </div>

        <button
          className="btn btn-primary save-profile"
          onClick={
            saveProfile
          }
        >
          Save Profile
        </button>

      </div>
    </>
  );
}
