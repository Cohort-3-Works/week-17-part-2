require("dotenv").config();
import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server started !!!`);
});
