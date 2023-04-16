import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  name: String,
  refresh: String,
  isAdmin: Boolean,
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
  ],
});
