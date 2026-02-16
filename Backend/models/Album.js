
import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true, // "Whole experience of the trip"
        },
        coverImage: {
            type: String,
            default: "", // Can be one of the photos
        },
    },
    { timestamps: true }
);

export default mongoose.model("Album", albumSchema);
