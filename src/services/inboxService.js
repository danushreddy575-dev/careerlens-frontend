import API from "../api/api";

export const getGmailStatus =
  async () => {

    const res =
      await API.get(
        "/api/gmail/status"
      );

    return res.data;

};

export const connectGmail =
  async () => {

    const res =
      await API.get(
        "/api/gmail/connect"
      );

    return res.data;

};

export const getTrustedJobs =
  async () => {

    const res =
      await API.get(
        "/api/gmail/inbox/trusted"
      );

    return res.data;

};

export const getReviewJobs =
  async () => {

    const res =
      await API.get(
        "/api/gmail/inbox/review"
      );

    return res.data;

};

export const getFilteredJobs =
  async () => {

    const res =
      await API.get(
        "/api/gmail/inbox/filtered"
      );

    return res.data;

};
