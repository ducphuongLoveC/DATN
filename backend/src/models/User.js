import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 255,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 255,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 10,
    },
    profile_picture: {
      type: String,
      maxlength: 255,
      default:
        "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png",
    },

    role: {
      type: String,
      enum: [
        "admin",
        "post manager",
        "course manager",
        "statistics manager",
        "comment manager",
        "member",
      ],
      default: "member",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
