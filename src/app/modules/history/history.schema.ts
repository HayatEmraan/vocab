import { model, Schema } from 'mongoose';
import { historyTypes } from './history.types';

const historySchema = new Schema<historyTypes>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    adminId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    action: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const historyModel = model<historyTypes>('history', historySchema);

export default historyModel;
