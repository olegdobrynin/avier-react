import { $authHost, $host } from './index.js';

export const createArtist = async (art) => {
  const { data } = await $authHost.post('api/artist', art);
  return data;
};

export const deleteArtist = async (id) => {
  const { data } = await $authHost.delete(`api/artist/${id}`);
  return data;
};

export const fetchArtists = async (userId) => {
  const { data } = await $host.get('api/artist', { params: { userId } });
  return data;
};

export const fetchOneArtist = async (id) => {
  const { data } = await $host.get(`api/artist/${id}`);
  return data;
};

export const updateArtist = async (id, art) => {
  const { data } = await $authHost.patch(`api/artist/${id}`, art);
  return data;
};
