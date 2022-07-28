import { $authHost, $host } from './index.js';

export const registration = async (login, password) => {
  const {
    data: { user, token },
  } = await $host.post('api/user/registration', { login, password });
  localStorage.setItem('token', token);
  return user;
};

export const auth = async (login, password) => {
  const {
    data: { user, token },
  } = await $host.post('api/user/login', { login, password });
  localStorage.setItem('token', token);
  return user;
};

export const check = async () => {
  const {
    data: { user, token },
  } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', token);
  return user;
};

export const deleteUser = (id) => $authHost.delete(`api/user/${id}`);

export const setUserRole = (login, role) => $authHost.patch('api/user/role', { login, role });
