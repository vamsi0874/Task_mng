import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "manager", "user"], default: "user" },
  profileImageUrl: { type: String , default: "/logx.png" },

}, { timestamps: true });

export default mongoose.model('User', userSchema);
