import { model, Schema } from 'mongoose';
import { vocabTypes } from './vacab.types';

const vocabSchema = new Schema<vocabTypes>(
  {
    word: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    useCase: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const vocabModel = model<vocabTypes>('vocab', vocabSchema);

export default vocabModel;
