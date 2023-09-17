import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8081, () => {
  console.log("Server is Listening on port 8081");
});

const MONGO_URL = "mongodb+srv://bhavyapopat8:FdYFEmGFV30FyLZ6@cluster0.pdq2tzc.mongodb.net/demo";

async function connectToMongoDb() {
  await mongoose.connect(MONGO_URL);
}

connectToMongoDb()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: " + err.message));

app.use("/", router());
