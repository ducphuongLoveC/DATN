import mongoose from "mongoose";

const accsessSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "UserId is required"]
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "CourseId is required"]
        },

        access_date: {
            type: Date,
            default: Date.now,
            required: true
        },

        expiration_date: {
            type: Date,
            required: true,
            default: function () {
                // Tính toán ngày hết hạn là 30 ngày sau
                const currentDate = new Date();
                const expirationDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
                return expirationDate;
              }
        }
    },
    {
        timestamps: true,
        versionKey:false
    }
)

export default mongoose.model("Access", accsessSchema)