import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  const authorization = `Bearer ${localStorage.getItem('token')}`;
  return { ...config, headers: { ...config.headers, authorization } };
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
