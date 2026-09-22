import API from "../api/api";

export const getProfile = (userId) =>
  API.get(`/api/users/${userId}`);

export const updateProfile = (
  userId,
  data
) =>
  API.put(
    `/api/users/${userId}`,
    data
  );