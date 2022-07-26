import { $authHost } from './index.js';

export const createMark = async (artId) => {
  const { data } = await $authHost.post(`api/mark/${artId}`);
  return data;
};

export const deleteMark = async (artId) => {
  const { data } = await $authHost.delete(`api/mark/${artId}`);
  return data;
};

export const fetchMarks = async (artId, limit) => {
  const { data } = await $authHost.get('api/mark/', { params: { artId, limit } });
  return data;
};
