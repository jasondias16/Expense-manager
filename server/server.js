const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());
const UserModel = require("./schemas/User");
const ExpenseModel = require("./schemas/Expense");
const MonthlyBugetModel = require("./schemas/MonthlyBudget");
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

    res.send("sign in successfully");
  }
  // checking if the user already used the email to sign in previously
  async function check_email_already_in_use() {
    const user_already_exist = await UserModel.find({ email: u_email }).select({
      email: 1,
    });

    if (user_already_exist.length === 0) {
      //new user
      run();
    }
    //  else send message to the user : user already exist
    else {
      res.send("Email already in use");
    }
  }

  check_email_already_in_use();
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
      category: req.body.category.toLowerCase(),
      amount: req.body.amount,
      userID: req.body.id,
    });
  }

  insertExpenseData();
});

app.post("/getMonthlyexpense", (req, res) => {
  async function getMonthlyExpenseData() {
    var today = new Date();
    var month = today.getMonth();
    var year = today.getFullYear();

    dte = year.toString() + "-" + (month + 1) + "-01";

    const expenses = await ExpenseModel.find({
      userID: req.body.userId,
      date: { $gte: dte },
    });
    res.json(expenses);
  }
  getMonthlyExpenseData();
});

app.post("/getweeklyexpense", (req, res) => {
  async function getWeeklyExpenseData() {
    var today = new Date();
    var weekstart = today.getDate() - today.getDay() + 1;
    var month = today.getMonth();
    var year = today.getFullYear();
    var weekStartDay = year + "-" + (month + 1) + "-" + weekstart;
    var weekEndDay = year + "-" + (month + 1) + "-" + (weekstart + 7);

    const expenses = await ExpenseModel.find({
      userID: req.body.userId,
      date: { $gte: weekStartDay, $lte: weekEndDay },
    });
    res.json(expenses);
  }
  getWeeklyExpenseData();
});

app.post("/setMonthlyBudget", (req, res) => {
  // console.log(req.body);
  async function insertExpenseData() {
    const categoryBudget = await MonthlyBugetModel.create({
      date: req.body.date,
      category: req.body.category,
      amount: req.body.amount,
      userID: req.body.userId,
    });
  }
  //just display in the server for now
  insertExpenseData();
});

app.post("/getMonthlyBudget", (req, res) => {
  async function getMonthlyBudget() {
    const monthlyBudget = await MonthlyBugetModel.find({
      userID: req.body.userId,
    });
    //   console.log("monthly budget: ", monthlyBudget);
    res.json(monthlyBudget);
  }
  getMonthlyBudget();
});

app.post("/deletemonthlybudgetcard", (req, res) => {
  async function deleteMonthlyBudgetCard() {
    const monthlyBudget = await MonthlyBugetModel.deleteOne({
      _id: req.body.cardId,
    });
    //   console.log("monthly budget: ", monthlyBudget);
    res.send("record deleted");
  }
  console.log("req.body.cardId", req.body.cardId);
  deleteMonthlyBudgetCard();
});

app.post("/getUC", (req, res) => {
  async function getUniqueCategories() {
    const UniqueCategories = await ExpenseModel.find({
      userID: req.body.userId,
    }).distinct("category");

    res.json(UniqueCategories);
  }

  getUniqueCategories();
});

app.listen(3001);
