const pool = require("./src/service/db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Connection } = require("pg");
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

app.get("/getData", async (req, res) => {
  try {
    const result = await pool.query(
      "Select i.wid, p.name, i.sid,i.price, p.link from inventory i, product p where p.pid=i.pid"
    );
    res.json(result.rows);
  } catch {
    console.log("Gunay is not doing");
  }
});

app.listen(port, () => {
  console.log(`Server is runining on port ${port}`);
});
