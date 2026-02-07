import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password_hash: { type: String }, // optional for google/github users
        provider: { type: String, default: "local" }, // local/google/github
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
