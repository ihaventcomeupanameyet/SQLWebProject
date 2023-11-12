const pool = require("./src/service/db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app
  .get("/client", async (req, res) => {
    res.json({ message: "Animal" });
  })
  .post("/client", async (req, res) => {
    const text = req.body;
    console.log(text);
  });

app.listen(port, () => {
  console.log(`Server is runining on port ${port}`);
});
