import historyModel from './history.schema';
import { historyTypes } from './history.types';

const insertHistory = async (payload: historyTypes) => {
  return await historyModel.create(payload);
};

export const historyService = {
  insertHistory,
};
