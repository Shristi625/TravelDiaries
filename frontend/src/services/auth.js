import api from "../lib/axios";

export const signup = (data) => api.post("api/v1/auth/sign-up", data);

export const login = (data) => api.post("api/v1/auth/login", data);

export const logout = () => api.post("api/v1/auth/logout");
export const googleSignup = () => {
  window.location.href = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/google`;
};
