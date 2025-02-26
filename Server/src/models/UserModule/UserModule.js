const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    middleName: { type: String, default: "", trim: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: { 
      type: String, 
      required: true, 
      minlength: [6, "Password must be at least 6 characters long"]
    },
    mobileNumber: { 
      type: String, 
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"], 
      default: ""
    },
    gender: { 
      type: String, 
      enum: ["Male", "Female", "Other"], 
      default: "Other" 
    },
    role: { 
      type: String, 
      enum: ["admin", "user"], 
      default: "user" 
    },
    profilePhoto: { type: String, default: "" },
    address: {
      street: { type: String, default: "", trim: true },
      city: { type: String, default: "", trim: true },
      state: { type: String, default: "", trim: true },
      country: { type: String, default: "", trim: true },
      zip: { type: String, default: "", trim: true }
    },
    dateOfBirth: { type: Date },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true } // ✅ Automatically track createdAt and updatedAt
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
