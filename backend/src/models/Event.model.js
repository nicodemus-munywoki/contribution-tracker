import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    tag_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    host: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Event', eventSchema);
