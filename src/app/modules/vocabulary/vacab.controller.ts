/* eslint-disable @typescript-eslint/no-explicit-any */
import { catchAsync } from '@app/utils/catchAsync';
import globalReturn from '@app/utils/globalReturn';
import { RequestHandler } from 'express';
import { vocabService } from './vacab.service';
import httpStatus from 'http-status';
import { vocabTypes } from './vacab.types';

const createVocab: RequestHandler = async (req, res) => {
  const { _id } = req.user;

  const vocab = await vocabService.findVocab(req.body.id);
  const data = await vocabService.insertVocab({
    ...req.body,
    adminId: _id,
    updatedId: _id,
  });

  const msg = vocab
    ? 'vocab updated successfully'
    : 'vocab created successfully';

  globalReturn<vocabTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: msg,
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
  const { _id } = req.user;
  const data = await vocabService.updateVocab(req.params.id, {
    ...req.body,
    updatedId: _id,
  });
  globalReturn<vocabTypes | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vocab updated successfully',
    data,
  });
};

const completeVocab: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const data = await vocabService.completeVocab(req.params.id, _id);
  globalReturn<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vocab updated successfully',
    data,
  });
};

const getStats: RequestHandler = async (req, res) => {
  const data = await vocabService.getStats();
  globalReturn<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vocab stats fetched successfully',
    data,
  });
};

const getVocabByLesson: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const data = await vocabService.vocabByLesson(req.params.id, _id);
  globalReturn<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'vocab fetched successfully',
    data,
  });
};

export const vocabController = {
  createVocab: catchAsync(createVocab),
  getAllVocab: catchAsync(getAllVocab),
  getSingleVocab: catchAsync(getSingleVocab),
  updateVocab: catchAsync(updateVocab),
  completeVocab: catchAsync(completeVocab),
  getStats: catchAsync(getStats),
  getVocabByLesson: catchAsync(getVocabByLesson),
};
