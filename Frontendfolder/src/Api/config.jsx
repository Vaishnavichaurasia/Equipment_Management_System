import React from "react";

const baseURL = "http://127.0.0.1:8000";

// export const frontendUrl = "http://127.0.0.1:3000";

// export const domainURL="moreshop";

// export const localURL='127.0.0.1:3000';

const config = {
  siteURL: "127.0.0.1:8000",
  apiBaseURL: `${baseURL}/api`,
  staticBaseURL: `${baseURL}`,
  // imageUrl: `${baseURL}/media/`,
  apiTimeout: 500000,
};
export default config;
