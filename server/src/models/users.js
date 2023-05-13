import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrations: [{type: mongoose.Schema.Types.ObjectId, ref: "pilgrims"}]
});

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    adminid: { type: String, reuired: true, unique: true },
    password: { type: String, required: true },
    registrations: [{type: mongoose.Schema.Types.ObjectId, ref: "pilgrims"}]
});

const UserModel = mongoose.model("users", UserSchema);
const AdminModel = mongoose.model("admin", AdminSchema);

export { UserModel, AdminModel };