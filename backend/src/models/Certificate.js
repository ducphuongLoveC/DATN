import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:[true, "UserId is required"]
        },

        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "CourseId is required"]
        },

        issued_date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey:false
    }
)

export default mongoose.model("Certificate", certificateSchema)