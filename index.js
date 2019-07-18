const express = require("express");
const app = express();
const massive = require("massive");
require("dotenv").config();
const products_controller = require("./products_controller");
app.use(express.json());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("database connected!");
  })
  .catch(e => console.log(e));

//endpoints
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne)
app.put("/api/products/:id", products_controller.update)
app.post("/api/products", products_controller.create)
app.delete("/api/products/:id", products_controller.delete)

app.listen(process.env.SERVER_PORT, () => {
  console.log(` listening on ${process.env.SERVER_PORT}`);
});
