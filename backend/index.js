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
    res.status(400).json();
    console.log(error);
    console.log("hello?");
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
app.post("/join", async (req, res) => {
  try {
    const { quantity } = req.body;
    const query = "select* from orders o, itemsorder i where i.oid=o.oid and o.cid=i.cid and i.quantity =$1";
    const result = await pool.query(query, [quantity]);
    
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

app.post("/selection", async (req, res) => {
  const { oid, cid, price, oidSwitch, cidSwitch } = req.body;
  try {
    let query = "select * from orders where oid=$1 $200 cid=$2 $300 price=$3";
    query = query.replace("$200", oidSwitch);
    query = query.replace("$300", cidSwitch);
    console.log(query);

    const result = await pool.query(query, [oid, cid, price]);
    const colNumaes = result.fields.map((field) => field.name);
    const data = {
      colNumaes,
      rows: result.rows,
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json();
  }
});

app.post("/insertThingy", async (req, res) => {
  const { wid, adress, mid, flag } = req.body;
  try {
    const query =
      "insert into warehouse(wid, address, mid, flag) values ($1, $2, $3, $4)";

    const result = await pool.query(query, [wid, adress, mid, flag]);
    res.status(200).json({ msg: "Added To the Database" });
    console.log("We got into here");
  } catch (error) {
    res.status(400).json();
    console.log(error);
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

    const query1 = "select * from inventory where wid=$1 and pid=$2 and sid=$3";
    const result1 = await pool.query(query1, [wid,pid,sid]);
    if (result1 && result1.rows && result1.rows.length == 0) {
      throw new Error();
    }

    const result = await pool.query(query, value);
    res.status(200).json({ msg: "Altered item count" });
  } catch (error) {
    res.status(400).json();
  }
});

app.get("/purchaseAllItem", async (req, res) => {
  try {
    const result = await pool.query(
      "select c.cid,c.name,c.street_address,c.postal_code from client c where not exists (select pid from product except (select pid from itemsorder b where b.cid=c.cid))"
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

app.get("/AvgOrderPerchase", async (req, res) => {
  try {
    const result = await pool.query(
      "select cid,name, AVG(num) as avg_num_items_purchased_per_order from (select c.cid,name,sum(i.quantity) as num from client c, orders o, itemsorder i where c.cid=o.cid and c.cid = i.cid and i.oid = o.oid group by c.cid, o.oid) group by name,cid;"
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

app.get("/warehouseNetWorth/:value", async (req, res) => {
  try {
    const netWorth = req.params.value;
    console.log(netWorth);
    const query =
      "select w.wid,sum(i.item_count * i.price) as net_value from warehouse w, inventory i where w.wid=i.wid group by w.wid having sum(i.item_count * i.price) > $1";
    const value = [netWorth];
    const result = await pool.query(query, value);
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

app.listen(port, () => {
  console.log(`Server is runining on port ${port}`);
});

// delete items(product)
app.post("/delete", async (req, res) => {
  const { pid } = req.body;
  try {
    const query1 = "select * from product where pid = $1";
    const result1 = await pool.query(query1, [pid]);
    if (result1 && result1.rows && result1.rows.length == 0) {
      throw new Error("Such product does not exist");
    }
    const query = "delete from product where pid = $1";
    const result = await pool.query(query, [pid]); // this is the query from the database, output is built in, success or unsucess
    // ONLY GETS THE TUPPLES, NOT COLUMN NAMES
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(400).json();
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

app.get("/order", async (req, res) => {
  try {
    const result = await pool.query("select * from orders");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
    const data = {
      colNumaes,
      rows: result.rows,
    };
    console.log(colNumaes);
    res.json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// join itemorder and order
app.get("/joinOrder", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT ItemsOrder.OID, ItemsOrder.CID, ItemsOrder.WID, ItemsOrder.PID, ItemsOrder.SID, ItemsOrder.quantity, Orders.price FROM ItemsOrder NATURAL JOIN Orders"
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
    res.status(400).json({ msg: error.message });
  }
});
app.get("/ItemPurchasedGreater/:value", async (req, res) => {
  try {
    const num = req.params.value;
    console.log(num);
    const query =
      "select c.cid, c.name, c.email, sum(i.quantity) as purchased from client c natural join itemsorder i group by c.cid, c.name, c.email having sum(i.quantity)> $1";
    const value = [num];
    const result = await pool.query(query, value);
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

app.get("/product", async (req, res) => {
  try {
    const result = await pool.query("select pid,name from product");
    const colNumaes = result.fields.map((field) => field.name);
    // column names and rows that have all the rows, to display the table.
    const data = {
      colNumaes,
      rows: result.rows,
    };
    console.log(colNumaes);
    res.json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
