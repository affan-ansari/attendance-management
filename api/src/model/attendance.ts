import { Schema, model } from "mongoose";
import { IAttendance } from "src/common/interfaces";

const attendanceSchema = new Schema<IAttendance>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
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
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

const Attendance = model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;
