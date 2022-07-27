import { $authHost, $host } from './index.js';

export const createArtist = async (artist) => {
  const { data } = await $authHost.post('api/artist', artist);
  return data;
};

export const deleteArtist = async (id) => {
  const { data } = await $authHost.delete(`api/artist/${id}`);
  return data;
};

export const fetchArtists = async () => {
  const { data } = await $authHost.get('api/artist');
  return data;
};

export const fetchOneArtist = async (id) => {
  const { data } = await $host.get(`api/artist/${id}`);
  return data;
};

export const updateArtist = async (id, artist) => {
  const { data } = await $authHost.patch(`api/artist/${id}`, artist);
  return data;
};
