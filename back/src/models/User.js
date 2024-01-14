import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
    minLength: [3, "username must consist of min 3 symbols"],
  },

  password: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Enter a valid email",
    ],
  },
});

const User = new mongoose.model("User", userSchema);
export default User;
