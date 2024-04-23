import mongoose from "mongoose";

const ongoingSchema = new mongoose.Schema({
    "item": String,
})

const ongoing = mongoose.model("ongoing", ongoingSchema);

export default ongoing;