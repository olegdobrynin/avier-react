import { $authHost } from './index.js';

export const createMark = async (id, artId) => {
  const { data } = await $authHost.post(`api/mark/${id}/art/${artId}`);
  return data;
};

export const deleteMark = async (id, artId) => {
  const { data } = await $authHost.delete(`api/mark/${id}/art/${artId}`);
  return data;
};

export const fetchMarks = async (id, page, limit) => {
  const { data } = await $authHost.get(`api/mark/${id}`, { params: { page, limit } });
  return data;
};

export const checkMark = async (id, artId) => {
  const { data } = await $authHost.get(`api/mark/${id}/art/${artId}`);
  return data;
};
