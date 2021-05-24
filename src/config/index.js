import axios from "axios";

// export default axios.create({
//   baseURL: "http://127.0.0.1:4000/",
// });

// production server
export default axios.create({
  baseURL: "https://api.bon.finance",
});

// staging server
// export default axios.create({
//   baseURL: "https://api.bonfi.io",
// });

// // Local
// export const server_url = "http://127.0.0.1:4000/";
