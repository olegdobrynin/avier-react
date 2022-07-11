import { $authHost } from './index.js';

export const createLike = async (id, artId) => {
  const { data } = await $authHost.post(`api/like/${id}/art/${artId}`);
  return data;
};

export const deleteLike = async (id, artId) => {
  const { data } = await $authHost.delete(`api/like/${id}/art/${artId}`);
  return data;
};

export const fetchLikes = async (id, page, limit) => {
  const { data } = await $authHost.get(`api/like/${id}`, { params: { page, limit } });
  return data;
};
