import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.timeout = 5000;

const requests = async ({
  url,
  method = "get",
  params = {},
  data = {},
} = {}) => {
  method = method.toLocaleLowerCase();
  const res = await axios.request({ method, url, params, data });
  return res.data;
};

export default requests;
