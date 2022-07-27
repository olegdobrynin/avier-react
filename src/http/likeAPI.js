import { $authHost } from './index.js';

export const createLike = (artId) => $authHost.post(`api/like/${artId}`);

export const deleteLike = (artId) => $authHost.delete(`api/like/${artId}`);

export const fetchLikes = async (page, limit) => {
  const { data } = await $authHost.get('api/like', { params: { page, limit } });
  return data;
};
