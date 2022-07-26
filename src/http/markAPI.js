import { $authHost } from './index.js';

export const createMark = async (artId) => {
  const { data } = await $authHost.post(`api/mark/${artId}`);
  return data;
};

export const deleteMark = async (artId) => {
  const { data } = await $authHost.delete(`api/mark/${artId}`);
  return data;
};

export const fetchMarks = async (page, limit) => {
  const { data } = await $authHost.get('api/mark/', { params: { page, limit } });
  return data;
};
