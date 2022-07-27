import { $authHost } from './index.js';

export const createMark = (artId) => $authHost.post(`api/mark/${artId}`);

export const deleteMark = (artId) => $authHost.delete(`api/mark/${artId}`);

export const fetchMarks = async (artId, limit) => {
  const { data } = await $authHost.get('api/mark/', { params: { artId, limit } });
  return data;
};
