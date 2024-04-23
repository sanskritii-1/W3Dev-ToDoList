import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import operations from "./routes/operations.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/func", operations)

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.dbname });
  console.log("db connected");
}

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
})