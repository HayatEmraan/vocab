import { model, Schema } from 'mongoose';
import { lessonTypes } from './lesson.types';

const lessonSchema = new Schema<lessonTypes>(
  {
    name: {
      type: String,
      required: true,
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
    reason: {
      type: String,
      default: 'created',
    },
    photoURL: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lessonModel = model<lessonTypes>('lesson', lessonSchema);

export default lessonModel;
