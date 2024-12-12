import { model, Schema } from 'mongoose';
import {
  historyTypes,
  lessonHistoryTypes,
  vocabHistoryTypes,
} from './history.types';

const userHistorySchema = new Schema<historyTypes>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userHistoryModel = model<historyTypes>(
  'userHistory',
  userHistorySchema
);

const lessonSchema = new Schema<lessonHistoryTypes>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'lesson',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const lessonHistoryModel = model<lessonHistoryTypes>(
  'lessonHistory',
  lessonSchema
);

const vocabHistorySchema = new Schema<vocabHistoryTypes>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    vocabId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'vocab',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const vocabHistoryModel = model<vocabHistoryTypes>(
  'vocabHistory',
  vocabHistorySchema
);
