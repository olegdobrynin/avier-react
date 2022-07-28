import { $authHost, $host } from './index.js';

export const createArt = async (art) => {
  const { data } = await $authHost.post('api/art', art);
  return data;
};

export const deleteArt = async (id) => {
  const { data } = await $authHost.delete(`api/art/${id}`);
  return data;
};

export const fetchArts = async (isAuthUser, params) => {
  const { data } = isAuthUser
    ? await $authHost.get('api/art', { params })
    : await $host.get('api/art', { params });
  return data;
};

export const fetchOneArt = async (isAuthUser, id) => {
  const { data } = isAuthUser
    ? await $authHost.get(`api/art/${id}`)
    : await $host.get(`api/art/${id}`);
  return data;
};
