import * as mongoose from "mongoose";
const uri: string = process.env.MONGODB_URI as string;
import User from "../types/user";
import type { IUser } from "../types/user";

const userServices = {
  getUser: (publicKey: string) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri, (err) => {
        if (err) {
          reject(err);
        }
        User.findOne({ publicKey }, (err: any, user: any) => {
          if (err) {
            reject(err);
          }

          if (user) {
            resolve(user);
          }

          reject(new Error("User not found"));
        });
      });
    });
  },
  createUser: (user: IUser) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri, (err) => {
        if (err) {
          reject(err);
        }
        User.findOne({ publicKey: user.publicKey }, (err: any, user: any) => {
          if (err) {
            reject(err);
          }

          if (user) {
            reject(new Error("User already exists"));
          }
        });
        const newUser = new User(user);
        newUser.save((err: any) => {
          if (err) {
            reject(err);
          }
          resolve(newUser);
        });
      });
    });
  },
  updateUser: (user: IUser) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri, (err) => {
        if (err) {
          reject(err);
        }
        User.findOneAndUpdate(
          { publicKey: user.publicKey },
          user,
          (err: any) => {
            if (err) {
              reject(err);
            }
            resolve(user);
          }
        );
      });
    });
  },
};

export default userServices;
