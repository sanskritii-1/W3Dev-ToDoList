import mongoose from "mongoose";

const doneSchema = mongoose.Schema({
    "item": String,
})

const done = mongoose.model("completed", doneSchema);

export default done;