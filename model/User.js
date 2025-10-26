import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    // tiga dibawah ini untuk nanti dijelaskan
    // created_at: { type: Date, default: Date.now },
    // updated_at: { type: Date, default: Date.now },
    // deleted: { type: Boolean, default: false },
});

export default mongoose.model("user", userSchema);