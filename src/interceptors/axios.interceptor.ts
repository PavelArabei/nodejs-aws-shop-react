import axios from "axios";
import { notify } from "~/utils/toaster";

export const runAxiosInterceptor = (): void => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        notify(error.message);
      }
      return Promise.reject(error);
    }
  );
};
