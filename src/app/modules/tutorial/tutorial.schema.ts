import { model, Schema } from 'mongoose';
import { tutorialTypes } from './tutorial.types';

const tutorialSchema = new Schema<tutorialTypes>(
  {
    url: {
      type: String,
      required: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const tutorialModel = model<tutorialTypes>('tutorial', tutorialSchema);

export default tutorialModel;
