import axios from "axios";

const API_URL =
  "http://localhost:5000/api/applications";

export const getAppliedApplications =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/status/applied`
      );

    return res.data;

};

export const getInterviewApplications =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/status/interview`
      );

    return res.data;

};

export const getAcceptedApplications =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/status/accepted`
      );

    return res.data;

};

export const getRejectedApplications =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/status/rejected`
      );

    return res.data;

};