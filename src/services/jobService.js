import API from "../api/api";

export const getJobs=(page=1)=>
API.get(`/jobs?page=${page}`);