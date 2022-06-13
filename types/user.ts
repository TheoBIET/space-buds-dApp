import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  publicKey: string;
  username: string;
  description: string;
}

export const UserSchema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  description: {
    type: String,
    maxlength: 100,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;