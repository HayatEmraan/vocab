import { catchAsync } from '@app/utils/catchAsync';
import globalReturn from '@app/utils/globalReturn';
import { RequestHandler } from 'express';
import { vocabService } from './vacab.service';
import httpStatus from 'http-status';
import { vocabTypes } from './vacab.types';

const createVocab: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const data = await vocabService.insertVocab({ ...req.body, adminId: _id });

  globalReturn<vocabTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'vocab created successfully',
    data,
  });
};

const getAllVocab: RequestHandler = async (req, res) => {
  const data = await vocabService.getAllVocab();
  globalReturn<vocabTypes[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vocab fetched successfully',
    data,
  });
};

const getSingleVocab: RequestHandler = async (req, res) => {
  const data = await vocabService.getSingleVocab(req.params.id);
  globalReturn<vocabTypes | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vocab fetched successfully',
    data,
  });
};

const updateVocab: RequestHandler = async (req, res) => {
  const data = await vocabService.updateVocab(req.params.id, req.body);
  globalReturn<vocabTypes | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vocab updated successfully',
    data,
  });
};

export const vocabController = {
  createVocab: catchAsync(createVocab),
  getAllVocab: catchAsync(getAllVocab),
  getSingleVocab: catchAsync(getSingleVocab),
  updateVocab: catchAsync(updateVocab),
};
