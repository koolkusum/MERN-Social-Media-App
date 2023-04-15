import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    //not required
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    //cant like twice
    //o(n) vs o(1)
    likes: {
      type: Map,
      of: Boolean,
    },
    //array of diff comments
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;