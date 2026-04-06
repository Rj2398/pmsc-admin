import axios from "axios";
import { KEYS, baseURL } from "../config/constant";
import { clearUser } from "../store/slices/userSlice";
import store from "../store";

const api = axios.create({
  baseURL,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // 1. Get token from Redux state first (fastest)
    const { userInfo } = store.getState().user;
    let token = userInfo?.token;
    console.log(userInfo, "userdata*****");
    // 2. Fallback to localStorage if Redux is empty (Standard Web API)
    if (!token) {
      const savedUser = localStorage.getItem(KEYS.USER_INFO);
      const storedUser = savedUser ? JSON.parse(savedUser) : null;
      token = storedUser?.accessToken;
      console.log(savedUser, "saved video");
    }

    // ✅ Attach token if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Note: Axios automatically sets 'Content-Type' for FormData and JSON.
    // Explicitly setting it can sometimes interfere with boundary headers in FormData.
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extracting the best possible error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors[0] ||
      "Something went wrong. Please try again later.";

    const customError = {
      message,
      status: error.response?.status,
    };

    // ✅ Auto logout and redirect on 401 (Unauthorized)
    if (error.response?.status === 401) {
      store.dispatch(clearUser());
      localStorage.removeItem(KEYS.USER_INFO);
      // Optional: window.location.href = '/login';
    }

    return Promise.reject(customError);
  }
);

export { api };
