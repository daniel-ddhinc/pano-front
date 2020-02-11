import axios from "axios";

export const detectItem = data => {
  return axios.post("/api/item", data);
};
