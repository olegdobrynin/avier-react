import { $authHost } from './index.js';

export const createArt = async (art) => {
  const { data } = await $authHost.post('api/art', art);
  return data;
};

export const deleteArt = async (id) => {
  const { data } = await $authHost.delete(`api/art/${id}`);
  return data;
};

export const fetchArts = async (params) => {
  const { data } = await $authHost.get('api/art', { params });
  return data;
};

export const fetchOneArt = async (id) => {
  const { data } = await $authHost.get(`api/art/${id}`);
  return data;
};
