import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Test GET route
app.get("/doubt", (req, res) => {
  res.send("doubt is running 🚀");
});

// ADD THIS — your POST API endpoint
app.post("/doubt", (req, res) => {
  const { stuname, sturoll } = req.body;

  console.log("Received data from client:", stuname, sturoll);

  res.json({
    received: { stuname, sturoll }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
