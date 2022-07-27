import { $authHost, $host } from './index.js';

export const createType = async (name) => {
  const { data } = await $authHost.post('api/type', { name });
  return data;
};

export const deleteType = (id) => $authHost.delete(`api/type/${id}`);

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;
};
