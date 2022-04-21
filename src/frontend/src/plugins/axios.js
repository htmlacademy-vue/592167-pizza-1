import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    axiosInstance.$notifier.error(
      err?.response?.data?.error?.message || defaultMessage
    );
    return Promise.reject(err);
  }
);

export default axiosInstance;
