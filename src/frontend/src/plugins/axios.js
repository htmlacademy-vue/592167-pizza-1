import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    console.log(defaultMessage);
    return Promise.reject(err);
  }
);

export default axiosInstance;
