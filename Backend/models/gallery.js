import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        cloudinary_id: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
