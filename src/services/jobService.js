import API from "../api/api";

export const getJobs = (
  page = 1,
  preferredLocation = "",
  experienceLevel = ""
) => {
  const params =
    new URLSearchParams({
      page
    });

  if (preferredLocation) {
    params.set(
      "preferredLocation",
      preferredLocation
    );
  }

  if (experienceLevel) {
    params.set(
      "experienceLevel",
      experienceLevel
    );
  }

  return API.get(
    `/jobs?${params.toString()}`
  );
};

export const saveJob = (
  userId,
  jobId
) =>
  API.post(
    `/api/users/${userId}/save-job/${jobId}`
  );

export const getSavedJobs = (
  userId
) =>
  API.get(
    `/api/users/${userId}/saved-jobs`
  );

export const removeSavedJob = (
  userId,
  jobId
) =>
  API.delete(
    `/api/users/${userId}/save-job/${jobId}`
  );
