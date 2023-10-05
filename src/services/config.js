import axios from 'axios';

const SERVER_API = 'http://127.0.0.1:8000/api/';

let axiosInstance = axios.create({
  baseURL: SERVER_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const todos_token = getAuthToken();
    if (todos_token) {
      config.headers['Authorization'] = `Bearer ${todos_token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (
      error.response.data.code === 'token_not_valid' ||
      error.response.status === 401 ||
      error.response.statusText === 'Unauthorized' ||
      error.response.data.detail === 'Authentication credentials were not provided.'
    ) {
      removeToken();
      window.location.href = `/`;
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export const storeToken = (access) => {
  if (access) {
    localStorage.setItem('todos_token', access);
    if (axiosInstance?.defaults?.headers?.common['Authorization']) {
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + access;
    }
  } else {
    delete axiosInstance?.defaults?.headers?.common['Authorization'];
    localStorage.removeItem('hotelproxi_user_token');
    localStorage.removeItem('hotelproxi_user_token_refresh');
  }
};
export const removeToken = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
  localStorage.removeItem('todos_token');
};

export const getAuthToken = () => {
  return localStorage.getItem('todos_token');
};

export { axiosInstance, SERVER_API };
