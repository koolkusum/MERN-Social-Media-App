import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    //required field
    firstName: {
      type: String,
      required: true,
      min: 2,//min of 2 vals
      max: 50,//max 50 vals
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    //not required field
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  //gives automatic dates
  { timestamps: true }
);
//user is defined by this schema
const User = mongoose.model("User", UserSchema);
export default User;