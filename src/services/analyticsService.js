import API from "../api/api";

export const getAnalytics =
()=>

API.get(
"/api/analytics"
);