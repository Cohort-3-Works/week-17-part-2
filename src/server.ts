require("dotenv").config();
import express, { Request, Response } from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

const client = new Client(`${process.env.DB_URL}`);

async function connectDB() {
  try {
    await client.connect();
    console.log("database connected !!!");

    app.listen(process.env.PORT, () => {
      console.log(`Server started on PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

app.post("/signup", async (req: Request, res: Response) => {
  const { username, password, email, city, country, street, pincode } =
    req.body;
  try {
    const insertQuery = `INSERT INTO users (username , password , email ) VALUES ($1 , $2,  $3) RETURNING id`;

    const response = await client.query(insertQuery, [
      username,
      password,
      email,
    ]);
    console.log(response);

    const user_id = response.rows[0].id;

    const insertAddress =
      "INSERT INTO addresses (city , country , street , pincode, user_id) VALUES ($1, $2 , $3 , $4, $5)";
    const addressResponse = await client.query(insertAddress, [
      city,
      country,
      street,
      pincode,
      user_id,
    ]);

    return res.status(200).json({
      success: true,
      message: "successfull !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error occured",
    });
  }
});

app.post("/betterSignup", async (req: Request, res: Response) => {
  const { username, password, email, city, country, street, pincode } =
    req.body;
  try {
    await client.query("BEGIN;");

    const insertQuery = `INSERT INTO users (username , password , email ) VALUES ($1 , $2,  $3) RETURNING id`;

    const response = await client.query(insertQuery, [
      username,
      password,
      email,
    ]);
    console.log(response);

    const user_id = response.rows[0].id;

    const insertAddress =
      "INSERT INTO addresses (city , country , street , pincode, user_id) VALUES ($1, $2 , $3 , $4, $5)";
    const addressResponse = await client.query(insertAddress, [
      city,
      country,
      street,
      pincode,
      user_id,
    ]);

    await client.query("COMMIT;");

    return res.status(200).json({
      success: true,
      message: "successfull !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error occured",
    });
  }
});

connectDB();
