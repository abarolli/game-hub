import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: { key: "7fdddbc7b44d47d1b034b52887bff2a0" },
});
