import axios from "axios";
import { User, API_HEADERS } from "./types/types";

const API_URL: string = import.meta.env.VITE_API_URL;

export const register = (email: string, password: string) => {
  const data = {
    email: email, 
    password: password
  };

  return axios
  .post(API_URL + "register", data, { headers: API_HEADERS })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
};

export const login = (email: string, password: string) => {
  const data = {
    email: email, 
    password: password
  };

  return axios
    .post(API_URL + "login", data, { headers: API_HEADERS })
    .then((response) => {
      if (response.data.jwtToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};

// We use it while accessing private resources: ex. axios.get(API_URL + "shops", { headers: {"Authorization": authHeader()} });
export const authHeader = (): string => {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.jwtToken) {
    return 'Bearer ' + user.jwtToken;
  } else {
    return '';
  }
}