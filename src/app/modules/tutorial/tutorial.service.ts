import tutorialModel from './tutorial.schema';
import { tutorialTypes } from './tutorial.types';

const insertTutorial = async (payload: tutorialTypes) => {
  return await tutorialModel.create(payload);
};

const getAllTutorials = async () => {
  return await tutorialModel.find();
};

const getSingleTutorial = async (id: string) => {
  return await tutorialModel.findById(id);
};

const updateTutorial = async (id: string, payload: Partial<tutorialTypes>) => {
  return await tutorialModel.findByIdAndUpdate(id, payload, { new: true });
};

export const tutorialService = {
  insertTutorial,
  getAllTutorials,
  getSingleTutorial,
  updateTutorial,
};
