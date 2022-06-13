import * as mongoose from "mongoose";
const uri: string = process.env.MONGODB_URI as string;

module.exports = {
  connect: async () => {
    return await mongoose.connect(uri);
  },
};
