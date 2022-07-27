import jwtDecode from 'jwt-decode';
import { $authHost, $host } from './index.js';

export const registration = async (login, password) => {
  const { data } = await $host.post('api/user/registration', { login, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const auth = async (login, password) => {
  const { data } = await $host.post('api/user/login', { login, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const deleteUser = (id) => $host.delete(`api/user/${id}`);

export const setUserRole = async (userName, role) => {
  $host.path(`api/user/${userName}`, { role });
};
