import mongoose from "mongoose";

const Register = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    aadhar: { type: Number, required: true },
    phno: { type: Number, required: true },
    address: { type: String, required: true }
});

export const PilgrimModel = mongoose.model("pilgrims", Register);