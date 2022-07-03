import { $authHost, $host } from './index.js';

export const createArt = async (art) => {
  const { data } = await $authHost.post('api/art', art);
  return data;
};

export const deleteArt = async (id) => {
  const { data } = await $authHost.delete(`api/art/${id}`);
  return data;
}

export const fetchArts = async (typeId, artistId, page, limit) => {
  const { data } = await $host.get('api/art', { params: {
    typeId, artistId, page, limit
  }});
  return data;
};

export const fetchOneArt = async (id) => {
  const {data} = await $host.get(`api/art/${id}`);
  return data;
};
