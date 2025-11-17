import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  profilePic: {
    type: String, // URL of uploaded image
    default: "",
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
