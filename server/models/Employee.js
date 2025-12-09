import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  position: { type: String, default: "" },
  department: { type: String, default: "" },
  salary: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
