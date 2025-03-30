import axios from "axios";
export const httpClient  = axios.create({
    baseURL: "https://api-dev.quicklyinc.com/auth/",
  });

export const domainName = "http://localhost:5173";
