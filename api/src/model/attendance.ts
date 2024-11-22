import { Schema, model, Document, Types } from "mongoose";

interface IAttendance extends Document {
  user: Types.ObjectId;
  status: "present" | "leave" | "absent";
  date: Date;
  punchIn: Date;
  punchOut: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "leave", "absent"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: () => new Date().setHours(0, 0, 0, 0), // Sets time to midnight
    },
    punchIn: {
      type: Date,
    },
    punchOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;
