const express = require("express");
const path = require("path");
const app = express();


const collection = require("./mongodb");

app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);

app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    //define the data
    name: req.body.name,
    password: req.body.password,
  };



  await collection.insertMany([data]);

  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("worng detalis");
  }
});

app.listen(3001, () => {
  console.log("port connected");
});
