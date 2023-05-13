import express from "express";
import { PilgrimModel } from "../models/register.js";
// import { UserModel, AdminModel } from "../models/users.js";

const router = express.Router();

router.get("/adminpilgrims", async (req, res)=>{
    try {
        const pilgrim = await PilgrimModel.find({});
        res.json(pilgrim);
    } catch(err) {
        console.log(err);
    }
});

router.post("/adminpilgrims", async (req, res)=>{
    const pilgrim = new PilgrimModel(req.body);
    try {
        const response = await pilgrim.save();
        res.json(response);
    } catch(err) {
        console.log(err);
    }
});


// router.put("/userpilgrims", async (req, res)=>{
//     try {
//         const pilgrim = await PilgrimModel.findById(req.body.pilgrimID);
//         const user = await UserModel.findById(req.body.userID);
//         user.registrations.push(pilgrim);
//         await user.save();
//         res.json({registrations: user.registrations });
//     } catch(err) {
//         console.log(err);
//     }
// });

// router.get("/userpilgrims", async (req, res)=>{
//     try {
//         const user = await UserModel.findById(req.body.userID);
//         res.json({ registrations: user?.registrations });
//     } catch(err) {
//         console.log(err);
//     }
// });

router.post("/userpilgrims", async (req, res)=>{
    const pilgrim = new PilgrimModel(req.body);
    try {
        const response = await pilgrim.save();
        res.json(response);
    } catch(err) {
        console.log(err);
    }
});
router.put("/adminpilgrims", async (req, res)=>{
    const newName = req.body.newName;
    const id = req.body.id;
    const filter = {_id: id}
    const update = {name: newName}
    try {
        PilgrimModel.findOneAndUpdate(filter, update, {
            new: true
          })
        .then((pilgrim)=>{
                res.send("Updated Successfully")
        })
        .catch((err)=> {
            console.log(err);
            res.status(400).send(err.message);
        });
    } catch(err) {
        console.log(err);
    }
});

router.delete("/adminpilgrims/:id", async (req, res)=> {
    const id = req.params.id;
    await PilgrimModel.deleteOne({_id: id})
    .then((response)=>res.send(response.data))
    .catch((error)=> res.status(400).send(error.message))
    ;
})


export { router as pilgrimRoute };

