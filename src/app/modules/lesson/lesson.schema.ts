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
