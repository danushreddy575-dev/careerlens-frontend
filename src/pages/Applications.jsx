import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

import {
  getAppliedApplications,
  getInterviewApplications,
  getAcceptedApplications,
  getRejectedApplications
}
from "../services/applicationService";

export default function Applications() {

  const [activeTab,
    setActiveTab] =
      useState("applied");

  const [applications,
    setApplications] =
      useState([]);

  useEffect(() => {

    loadApplications();

  }, [activeTab]);

  const loadApplications =
    async () => {

      let data;

      switch (activeTab) {

        case "interview":
          data =
            await getInterviewApplications();
          break;

        case "accepted":
          data =
            await getAcceptedApplications();
          break;

        case "rejected":
          data =
            await getRejectedApplications();
          break;

        default:
          data =
            await getAppliedApplications();

      }

      setApplications(
        data.applications
      );

  };

  return (

    <>
      <Navbar />

      <div className="container">

        <h1>
          Applications
        </h1>

        <div
          style={{
            display:"flex",
            gap:"10px",
            marginBottom:"20px"
          }}
        >

          <button
            onClick={() =>
              setActiveTab(
                "applied"
              )
            }
          >
            Applied
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "interview"
              )
            }
          >
            Interview
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "accepted"
              )
            }
          >
            Accepted
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "rejected"
              )
            }
          >
            Rejected
          </button>

        </div>

        {
          applications.map(
            app => (

              <div
                className="card"
                key={app._id}
                style={{
                  marginBottom:"15px"
                }}
              >

                <h3>
                  {app.role}
                </h3>

                <p>
                  Company:
                  {" "}
                  {app.company}
                </p>

                <p>
                  Status:
                  {" "}
                  {app.status}
                </p>

              </div>

            )
          )
        }

      </div>
    </>

  );

}