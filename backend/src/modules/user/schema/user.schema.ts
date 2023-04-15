import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
  },
  password: String,
  BMSAdmin: Boolean,
  modules: [
    {
      _id: false,
      name: String,
      permission: String,
    },
  ],
  structure: [
    {
      _id: false,
      club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
      },
      retails: [
        {
          _id: false,
          id: Number,
          points: [Number],
        },
      ],
    },
  ],
  name: String,
  email: String,
  comment: String,
  refresh: String,
  demoUser: {
    type: Boolean,
    default: false,
  },
});
