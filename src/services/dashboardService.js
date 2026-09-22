import API from "../api/api";

export const getDashboardSummary =
  async () => {
    const res =
      await API.get(
        "/api/dashboard/summary"
      );
    return res.data;
  };