import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "UserId is required"]
        },

        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "CourseId is required"]
        },

        rating_value: {
            type: Number,
            min: 1,
            max: 10,
        },

        comment: {
            type: String,
            maxlength: 255
        }


    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model("Rating", ratingSchema)