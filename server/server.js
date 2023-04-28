const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());
const UserModel = require("./schemas/User");
const ExpenseModel = require("./schemas/Expense");
//database connection
mongoose
  .connect("mongodb://127.0.0.1/expensedb", {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
  })
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));
//const { sigin } = require("./controllers/signin");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//to handle the form data from sign
app.post("/signup", (req, res) => {
  const u_fname = req.body.fname;
  const u_lname = req.body.lname;
  const u_email = req.body.email;
  const u_pass = req.body.password;

  async function run() {
    const user = await UserModel.create({
      fname: u_fname.trim(),
      lname: u_lname.trim(),
      email: u_email.trim(),
      password: u_pass,
    });
    //console.log(user);
    res.send("signed in successfully");
  }

  async function check_email_already_in_use() {
    const user_already_exist = await UserModel.find({ email: u_email }).select({
      email: 1,
    });

    console.log("user_already_exists: ", user_already_exist.length);

    if (user_already_exist.length === 0) {
      //new user
      run();
    }
    //  else send message to the user : user already exist
    else {
      res.send("user already exists");
    }
    // return user_already_exist;
  }

  //const user_already_exist =
  check_email_already_in_use();

  // check if the user already signed in with the email and dont let him sign in
  // if (user_already_exist === []) {
  //   run();
  // }
  // //  else sign in the user
  // else {
  //   res.send("user already exists");
  // }
});

app.post("/login", (req, res) => {
  const u_email = req.body.email;
  const u_pass = req.body.password;

  async function check_user_credentials() {
    const valid_user_credentials = await UserModel.find({
      email: u_email,
      password: u_pass,
    });
    //.select({ email: 1 });
    console.log(valid_user_credentials);

    if (valid_user_credentials.length === 0) {
      // invalid user = 0
      res.send("0");
    } else {
      //valid user =1
      console.log(valid_user_credentials[0]._id.toString());
      res.send(valid_user_credentials[0]._id.toString());
    }
  }

  //check if the user email and password exists in the database
  check_user_credentials();
});

app.post("/setExpenseData", (req, res) => {
  console.log(req.body);
  async function insertExpenseData() {
    const user = await ExpenseModel.create({
      date: req.body.date,
      category: req.body.category,
      amount: req.body.amount,
      userID: req.body.id,
    });
  }

  insertExpenseData();
});

app.post("/getexpense", (req, res) => {
  async function getExpenseData() {
    const expenses = await ExpenseModel.find({ userID: req.body.userId });
    res.json(expenses);
  }

  getExpenseData();
});

app.listen(3001);
