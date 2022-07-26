import { $authHost } from './index.js';

export const createLike = async (artId) => {
  const { data } = await $authHost.post(`api/like/${artId}`);
  return data;
};

export const deleteLike = async (artId) => {
  const { data } = await $authHost.delete(`api/like/${artId}`);
  return data;
};

export const fetchLikes = async (page, limit) => {
  const { data } = await $authHost.get('api/like', { params: { page, limit } });
  return data;
};
