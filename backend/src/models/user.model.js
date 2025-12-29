import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    privacy: {
      type: Boolean,
      required: [true, "Privacy agreement is required"],
      default: false,
    },
    travelTips: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.comparePassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compareSync(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);

export default User;
