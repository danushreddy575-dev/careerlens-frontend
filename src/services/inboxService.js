import axios from "axios";

const API_URL =
  "http://localhost:5000/api/gmail";

export const getTrustedJobs =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/inbox/trusted`
      );

    return res.data;

};

export const getReviewJobs =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/inbox/review`
      );

    return res.data;

};

export const getFilteredJobs =
  async () => {

    const res =
      await axios.get(
        `${API_URL}/inbox/filtered`
      );

    return res.data;

};