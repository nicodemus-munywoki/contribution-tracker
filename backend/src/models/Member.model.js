import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  amount: { type: Number, required: true },
  paidAt: { type: Date, default: null },
});

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, default: '' },
    role: { type: [String], enum: ['admin', 'user'], default: ['user'] },
    position: { type: String, default: '' },
    group: { type: Number, required: true }, // this will help determine min contribution
    married: { type: Boolean, default: false },
    spouse: {
      name: { type: String, default: '' },
      contributions: [contributionSchema],
    },
    contributions: [contributionSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Member', memberSchema);
