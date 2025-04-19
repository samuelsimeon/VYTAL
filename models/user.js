// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";  // switch to bcryptjs

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // No two users can have the same username
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare plain text password to hashed
UserSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

export default mongoose.model("User", UserSchema);
