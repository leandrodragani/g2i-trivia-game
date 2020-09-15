import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "https://opentdb.com",
});

export const fetcher = (url: string) =>
  apiInstance.get(url).then((res) => res.data);
