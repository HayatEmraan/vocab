/* eslint-disable @typescript-eslint/no-explicit-any */
import { catchAsync } from '@app/utils/catchAsync';
import globalReturn from '@app/utils/globalReturn';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { tutorialTypes } from './tutorial.types';
import { tutorialService } from './tutorial.service';

const createTutorial: RequestHandler = async (req, res) => {
  const data = await tutorialService.insertTutorial(req.body);
  globalReturn<tutorialTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'user created successfully',
    data,
  });
};

const getAllTutorials: RequestHandler = async (req, res) => {
  const data = await tutorialService.getAllTutorials();
  globalReturn<tutorialTypes[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'tutorials fetched successfully',
    data,
  });
};

const getSingleTutorial: RequestHandler = async (req, res) => {
  const data = await tutorialService.getSingleTutorial(req.params.id);
  globalReturn<tutorialTypes | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'tutorial fetched successfully',
    data,
  });
};

const updateTutorial: RequestHandler = async (req, res) => {
  const data = await tutorialService.updateTutorial(req.params.id, req.body);
  globalReturn<tutorialTypes | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'tutorial updated successfully',
    data,
  });
};

export const tutorialController = {
  createTutorial: catchAsync(createTutorial),
  getAllTutorials: catchAsync(getAllTutorials),
  getSingleTutorial: catchAsync(getSingleTutorial),
  updateTutorial: catchAsync(updateTutorial),
};
