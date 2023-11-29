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
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
});

app.get("/getGivenQuery", async (req, res) => {
  try {
    const result = await pool.query("select* from inventory");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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

app.post("/proyection", async (req, res) => {
  try {
    const { coll, name } = req.body;
    const format = require("pg-format");
    const columns = coll.split(",").map((columna) => columna.trim());
    const columnPlaceholders = columns.map(() => "%I").join(", ");
    const finalQuery = format(
      `SELECT ${columnPlaceholders} FROM %I`,
      ...columns,
      name
    );
    const result = await pool.query(finalQuery);
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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

//get products table
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("select pid, name from product");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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
app.get("/join", async (req, res) => {
  try {
    const result = await pool.query(
      "select* from orders o, itemsorder i where i.oid=o.oid"
    );
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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

app.get("/order", async (req, res) => {
  try {
    const result = await pool.query("select* from orders");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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
app.get("/itemsOrder", async (req, res) => {
  try {
    const result = await pool.query("select* from itemsorder");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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

app.get("/inventoryGetTable", async (req, res) => {
  try {
    const result = await pool.query("select* from inventory");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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
//get wharegouses
app.get("/wharehouses", async (req, res) => {
  try {
    const result = await pool.query("select* from warehouse");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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
//get supplier
app.get("/supplier", async (req, res) => {
  try {
    const result = await pool.query("select* from supplier");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
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

app.post("/signUp", async (req, res) => {
  const { name, street_address, postal_code, email, city, province, psword } =
    req.body;
  try {
    let cid;
    while (true) {
      cid = Math.floor(Math.random() * 1000000);
      const query1 = "Select cid from client where cid=$1";
      const result = await pool.query(query1, [cid]);
      if (result.rows.length == 0) {
        break;
      }
    }
    const query1 =
      "insert into client(CID, name, street_address, postal_code, email, password, city, province) values ($1, $2, $3, $4, $5, $6,$7,$8)";
    const value1 = [
      cid,
      name,
      street_address,
      postal_code,
      email,
      psword,
      city,
      province,
    ];
    const result = await pool.query(query1, value1);
    res.status(200).json({ msg: "Added To the Database" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/updateInven", async (req, res) => {
  const { wid, pid, sid, size, price } = req.body;
  try {
    const query =
      "update inventory set item_count = $1, price=$2 where wid=$3 and pid=$4 and sid=$5";
    const value = [size, price, wid, pid, sid];
    const result = await pool.query(query, value);
    res.status(200).json({ msg: "Altered item count" });
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`Server is runining on port ${port}`);
});

// delete items(product)
app.post("/delete", async (req, res) => {
  const { pid } = req.body;
  try {
    const query = "delete from product where pid = $1";
    const result = await pool.query(query, [pid]); // this is the query from the database, output is built in, success or unsucess
    // ONLY GETS THE TUPPLES, NOT COLUMN NAMES
    const query2 = "select*from products"; // we want to display the table after delete!!
    const result2 = await pool.query(query2);
    const colNames = result2.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
    // CREATE DATAFRAME COMBINING ROWS AND COLUMN NAME BOTH OBTAINED FROM RESULT2
    const data = {
      colNames,
      rows: result2.rows,
    };
    res.status(200).json({ msg: "Sucess" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.data });
  }
});

// // aggregation by haivng -> inventory
// app.post

// update inventory
app.post("/updatInventory", async (req, res) => {
  const { wid, pid, sid, threshold, item_count, price } = req.body;

  try {
    const updateQue =
      "UPDATE inventory SID = $1, threshold  = $2, item_count = $3, price = $4 WHERE WID = $5 AND PID = $6";
    const result = await pool.query(updateQue, [
      sid,
      threshold,
      item_count,
      price,
      wid,
      pid,
    ]);
    // get the resulting table after update:
    const query2 = "SELECT* FROM inventory";
    const result2 = await pool.query(query2);
    const colNames = result2.fields.map((field) => field.name);
    const data_inventory = {
      colNames,
      rows: result2.rows,
    };
    res.json(data_inventory);
  } catch (error) {
    return res.status(400).json({ msg: error.data_inventory });
  }
});

// join itemorder and order
app.get("/joinOrder", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT ItemsOrder.OID, ItemsOrder.CID, ItemsOrder.WID, ItemsOrder.PID, ItemsOrder.SID, ItemsOrder.quantity, Orders.price FROM ItemsOrder NATURAL JOIN Orders"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// aggreation with group by -> OID and CID + price representing total amount spent by each customer
// app.get("/moneySpent", async (req,res) => {

//   try {

//   }

// })

// projections
app.get("/manager", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM manager`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
app.get("/wharehouse", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM product`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/supplier", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM supplier`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/inventory", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM inventory`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/food", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM food`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/explosive", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM explosive`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/client", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM client`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/Client3", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM Client3`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/Client2", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM Client2`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/orders", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM orders`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/inspector", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM inspector`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/ItemsOrder", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM ItemsOrder`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/insurance", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM insurance`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/Insurances", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM Insurances`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/covers", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM covers`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.get("/audit", async (req, res) => {
  const { columns } = req.query;
  try {
    const query = `SELECT ${columns} FROM audit`;
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
