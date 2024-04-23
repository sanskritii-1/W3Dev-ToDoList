import express from "express";
import ongoing from "../models/ongoing.js";
import done from "../models/completed.js";

const router = express.Router();

router.post("/add", async (req,res)=>{
    try{
        let response;
        if(req.body.table=="ongoing"){
            response = new ongoing({item: req.body.text});

        }
        else{
            response = new done({item: req.body.text})
        }
        await response.save();
        res.json(response);
    }
    catch(err){
        console.log(err);
    }
})

router.post("/getItems", async (req,res)=>{
    try{
        let response;
        if(req.body.table=="ongoing"){
            response = await ongoing.find({});
        }
        else{
            response = await done.find({});
        }
        res.json(response);
    }
    catch(err){
        console.log(err);
    }
})

router.post("/delete", async (req,res)=>{
    try{
        await ongoing.deleteOne({ _id:req.body.id });
        res.status(200).send("Document deleted successfully");
    }
    catch(err){
        console.log(err);
    }
})

export default router;