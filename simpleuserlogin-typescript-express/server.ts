// server.ts
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.post("http://localhost:8080/login", { username, password });
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

app.listen(5555, () => {
  console.log("Server started on port 5555");
});
