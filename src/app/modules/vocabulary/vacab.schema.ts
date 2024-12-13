import { model, Schema } from 'mongoose';
import { vocabTypes } from './vacab.types';

const vocabSchema = new Schema<vocabTypes>(
  {
    word: {
      type: String,
      required: true,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'lesson',
    },
    adminId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    updatedId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
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
    duration: {
      type: Number,
      default: 2,
    },
    reason: {
      type: String,
      default: 'created',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const vocabModel = model<vocabTypes>('vocab', vocabSchema);

export default vocabModel;
