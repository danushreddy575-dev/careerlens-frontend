import API from "../api/api";

export const getSkillGap = (skills) =>
  API.post(
    "/api/skill-gap/analyze",
    skills ? { skills } : {}
  );

export const getRecommendations = (skills) =>
  API.post(
    "/api/recommendations",
    skills ? { skills } : {}
  );
