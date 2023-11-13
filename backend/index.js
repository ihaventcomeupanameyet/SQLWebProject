require("dotenv").config();
const pool = require("./src/service/db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Connection } = require("pg");
const jwt = require("jsonwebtoken");
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
      "Select i.wid, p.name, i.sid,i.price, p.link, p.pid from inventory i, product p where p.pid=i.pid"
    );
    res.json(result.rows);
  } catch {
    console.log("Gunay is not doing");
  }
});
app.post("/loginCheck", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "Select cid from client where email=$1 and password=$2";
    const values = [email, password];
    const result = await pool.query(query, values);
    const token = jwt.sign({ id: result.rows[0].cid }, process.env.JWT_SECRET);
    return res.json({ user: token });
  } catch (error) {
    console.log("Gunay is not doingx2");
  }
});

app.listen(port, () => {
  console.log(`Server is runining on port ${port}`);
});
