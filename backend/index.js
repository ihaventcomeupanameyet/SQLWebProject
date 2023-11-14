require("dotenv").config();
const pool = require("./src/service/db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Connection } = require("pg");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
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

app.get("/getGivenQuery", async (req, res) => {
  try {
    const result = await pool.query("select* from inventory");
    const colNumaes = result.fields.map((field) => field.name);
    const data = {
      colNumaes,
      rows: result.rows,
    };
    console.log(colNumaes);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addTheOrder", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { products, totalPrice } = req.body;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  try {
    //second we continue to insert the rest of the items in the for loop
    let oid;
    while (true) {
      oid = Math.floor(Math.random() * 1000000);
      const query1 = "Select oid from orders where oid=$1";
      const result = await pool.query(query1, [oid]);
      if (result.rows.length == 0) {
        break;
      }
    }
    const query2 = "insert into orders (oid, cid, price) values ($1, $2, $3)";
    values2 = [oid, decodedToken.id, totalPrice];
    console.log(oid);
    const result = await pool.query(query2, values2);
    for (const element of products) {
      try {
        const query3 =
          "insert into itemsorder (oid, cid, wid, pid, sid, quantity) values ($1, $2, $3, $4, $5, $6)";
        const values3 = [
          oid,
          decodedToken.id,
          element.wid,
          element.pid,
          element.sid,
          element.quantity,
        ];
        console.log(values3);

        const result = await pool.query(query3, values3);
        console.log("We pass the first query");
        //get the current number of items after the order
        const query4 =
          "select item_count from inventory where wid=$1 and pid=$2 and sid=$3";
        const values4 = [element.wid, element.pid, element.sid];
        const result2 = await pool.query(query4, values4);
        const finalValue = result2.rows[0].item_count - element.quantity;
        //actually put that number of items
        const query5 =
          "update inventory set item_count=$1 where wid=$2 and pid=$3 and sid=$4";
        const values5 = [finalValue, element.wid, element.pid, element.sid];
        const result3 = await pool.query(query5, values5);
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({ msg: "Added To the Database" });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});
app.listen(port, () => {
  console.log(`Server is runining on port ${port}`);
});
