import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel, AdminModel } from "../models/users.js";
import validator from "validator";
import { config } from "dotenv";
config();

const router = express.Router();

router.post("/usersignup", async (req, res) => {
    const { username, password } = req.body;
    if(validator.isEmail(username)==false) {
        return res.json({ message: "Not a valid mail id!" });
    }
    const user = await UserModel.findOne({username});
    if(user) {
        return res.json({ message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User Registration successful!" })
});

router.post("/userlogin", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if(!user) {
        return res.json({ message: "Register to login!" });
    }
    const passValidation = await bcrypt.compare(password, user.password);
    if(!passValidation) {
        return res.json({ message: "Invalid email or password!" });
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRETKEY);
    res.json({token, userID: user._id, message: "Login successful!"});
});

router.post("/adminsignup", async (req, res) => {
    const { username, adminid, password } = req.body;
    if(validator.isEmail(username)==false) {
        return res.json({ message: "Not a valid mail id!" });
    }
    const admin = await AdminModel.findOne({username});
    if(admin) {
        return res.json({ message: "Admin already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminModel({ username, adminid, password: hashedPassword });
    await newAdmin.save();
    res.json({ message: "Admin Registration successful!" })
});


router.post("/adminlogin", async (req, res) => {
    const { username, adminid, password } = req.body;
    const admin = await AdminModel.findOne({ username });
    if(!admin) {
        return res.json({ message: "Register to login!" });
    }
    const passValidation = await bcrypt.compare(password, admin.password);
    if(!passValidation) {
        return res.json({ message: "Invalid email or password!" });
    }
    const token = jwt.sign({id: admin._id}, process.env.JWT_SECRETKEY);
    res.json({token, adminID: admin._id, message: "Login successful!"});
});

export { router as userRoute };