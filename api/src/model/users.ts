import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Users", UserSchema, "Users");

// import { Schema, model, Document } from "mongoose";

// interface IUser extends Document {
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   pin: string;
//   designation: string;
// }

// const userSchema = new Schema<IUser>(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     pin: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     designation: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt fields
//   }
// );

// const User = model<IUser>("User", userSchema);

// export default User;
