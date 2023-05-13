import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRoute } from "./routes/users.js";
import { pilgrimRoute } from "./routes/pilgrims.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRoute);
app.use("/pilgrims", pilgrimRoute);


mongoose.connect(
    "mongodb+srv://harshini_lara:temple_db@temple.ueatnay.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
db.on('error', (err) => {
    console.log("Error connecting to database", err);
});
db.once('open', () => {
    console.log("Connected to database!");
});

app.listen(3001, () => {
    console.log("Server running on port: 3001");
});