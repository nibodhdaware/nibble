import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Running!");
});

function keepAlive() {
  app.listen(port, () => {
    console.log("Server is ready.");
  });
}

export default keepAlive;
