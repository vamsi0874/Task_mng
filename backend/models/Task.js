import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
})
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, enum: ["pending", "inProgress", "completed"], default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  todoCheckList: [todoSchema],
  progress : { type: Number, default: 0 },
  attachments: [{ type: String }], // Array of attachment URLs
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);