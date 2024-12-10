import appError from '@app/errors/appError';
import vocabModel from './vacab.schema';
import { vocabTypes } from './vacab.types';
import httpStatus from 'http-status';

const insertVocab = async (payload: vocabTypes) => {
  return await vocabModel.create(payload);
};

const getAllVocab = async () => {
  return await vocabModel.find();
};

const getSingleVocab = async (id: string) => {
  const findVocab = await vocabModel.findById(id);

  if (!findVocab) {
    throw new appError('Vocab not found', httpStatus.NOT_FOUND);
  }
  return await vocabModel.findById(id);
};

const updateVocab = async (id: string, payload: Partial<vocabTypes>) => {
  const findVocab = await vocabModel.findById(id);

  if (!findVocab) {
    throw new appError('Vocab not found', httpStatus.NOT_FOUND);
  }
  return await vocabModel.findByIdAndUpdate(id, payload, { new: true });
};

export const vocabService = {
  insertVocab,
  getAllVocab,
  getSingleVocab,
  updateVocab,
};
