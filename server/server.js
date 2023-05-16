const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());
const UserModel = require("./schemas/User");
const ExpenseModel = require("./schemas/Expense");
const MonthlyBudgetModel = require("./schemas/MonthlyBudget");
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
  const { fname, lname, email, password } = req.body;

  async function run() {
    const user = await UserModel.create({
      fname: fname.trim(),
      lname: lname.trim(),
      email: email.trim(),
      password: password,
    });

    res.send("1");
  }
  // checking if the user already used the email to sign in previously
  async function check_email_already_in_use() {
    const old_user = await UserModel.findOne({ email: u_email });

    //   send message to the user : user already exist
    if (old_user) {
      res.send("0");
    } else {
      run();
    }
  }

  check_email_already_in_use();
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //check if the user email and password exists in the database
  const valid_user_credentials = await UserModel.find({
    email: email,
    password: password,
  });
  //.select({ email: 1 });
  console.log(valid_user_credentials);

  if (valid_user_credentials.length === 0) {
    // invalid user = 0
    res.send("0");
  } else {
    //valid user =1
    console.log(valid_user_credentials[0]._id.toString());
    res.json(valid_user_credentials[0]);
  }
});

app.post("/set-expense-data", (req, res) => {
  // console.log(req.body);
  async function insertExpenseData() {
    const user = await ExpenseModel.create({
      date: req.body.date,
      category: req.body.category.toLowerCase(),
      amount: req.body.amount,
      userID: req.body.id,
    });
  }

  async function findUserBudget() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    month_start = "01/" + month + "/" + year.toString();

    const days_31 = [1, 3, 5, 7, 8, 10, 12];
    const days_30 = [4, 6, 9, 11];

    if (days_31.includes(month)) {
      //console.log("month has 31 days");
      month_end = "31/" + month + "/" + year.toString();
    } else if (days_30.includes(month)) {
      // console.log("month has 30 days");
      month_end = "30/" + month + "/" + year.toString();
    } else {
      //  console.log("month has 28/29 days");
      month_end = "29/" + month + "/" + year.toString();
    }

    const t = await MonthlyBudgetModel.where("userID")
      .equals(req.body.id)
      .where("category")
      .equals(req.body.category.toLowerCase())
      .where("date")
      .gte(month_start)
      .where("date")
      .lte(month_end);

    if (t.length === 0) {
      insertExpenseData();
      // sends 1 meaning expense did not cross monthly budget as it was never fixed

      res.send("1");
    } else {
      if (t[0].balance > req.body.amount) {
        insertExpenseData();
        //Update the balance record for the category
        await MonthlyBudgetModel.findOneAndUpdate(
          {
            userID: req.body.id,
            category: req.body.category.toLowerCase(),
            date: { $gte: month_start, $lte: month_end },
          },
          {
            $set: {
              balance: t[0].balance - req.body.amount,
            },
          }
        );

        res.send("1");
      } else {
        insertExpenseData();
        await MonthlyBudgetModel.findOneAndUpdate(
          {
            userID: req.body.id,
            category: req.body.category.toLowerCase(),
            date: { $gte: month_start, $lte: month_end },
          },
          {
            $set: {
              balance: 0,
            },
          }
        );

        res.send("0");
      }
    }
  }
  findUserBudget();

  // insertExpenseData();
});

app.get("/get-monthly-expense", (req, res) => {
  async function getMonthlyExpenseData() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    const days_31 = [1, 3, 5, 7, 8, 10, 12];
    const days_30 = [4, 6, 9, 11];
    month_start = year.toString() + "-" + month + "-01";
    // console.log("Month: ", month);
    if (days_31.includes(month)) {
      //  console.log("month has 31 days");
      month_end = year.toString() + "-" + month + "-31";
    } else if (days_30.includes(month)) {
      //  console.log("month has 30 days");
      month_end = year.toString() + "-" + month + "-30";
    } else {
      //  console.log("month has 28/29 days");
      month_end = year.toString() + "-" + month + "-29";
    }

    const expenses = await ExpenseModel.find({
      userID: req.query.userId,
      date: { $gte: month_start, $lte: month_end },
    });
    res.json(expenses);
  }
  getMonthlyExpenseData();
});

app.get("/get-weekly-expense", (req, res) => {
  async function getWeeklyExpenseData() {
    var today = new Date();
    var weekstart = today.getDate() - today.getDay() + 1;
    var month = today.getMonth();
    var year = today.getFullYear();
    var weekStartDay = year + "-" + (month + 1) + "-" + weekstart;
    var weekEndDay = year + "-" + (month + 1) + "-" + (weekstart + 7);

    const expenses = await ExpenseModel.find({
      userID: req.query.userId,
      date: { $gte: weekStartDay, $lte: weekEndDay },
    });
    res.json(expenses);
  }
  getWeeklyExpenseData();
});

app.post("/set-monthly-budget", (req, res) => {
  // console.log(req.body);
  async function insertExpenseData() {
    const categoryBudget = await MonthlyBudgetModel.create({
      date: req.body.date,
      category: req.body.category.toLowerCase(),
      amount: req.body.amount,
      balance: req.body.amount,
      userID: req.body.userId,
    });
  }
  //update query here
  async function updateExpenseData() {
    const categoryBudget = await MonthlyBudgetModel.findOneAndUpdate(
      { userID: req.body.userId, category: req.body.category.toLowerCase() },
      {
        $set: {
          amount: req.body.amount,
          balance: req.body.amount,
          date: req.body.date,
        },
      }
    );
  }

  //check if the category already exists then update the existing record
  async function check_user_category() {
    const result = await MonthlyBudgetModel.where("userID")
      .equals(req.body.userId)
      .where("category")
      .equals(req.body.category.toLowerCase());

    // // let category = result.category;

    //  console.log("Result", result);
    if (result.length === 0) {
      insertExpenseData();
      //  console.log("new category will be created");
    } else {
      updateExpenseData();
      //  console.log("update method will be called..");
    }
  }
  check_user_category();
});

app.get("/get-monthly-budget", (req, res) => {
  async function getMonthlyBudget() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    month_start = "01/" + month + "/" + year.toString();

    const days_31 = [1, 3, 5, 7, 8, 10, 12];
    const days_30 = [4, 6, 9, 11];

    if (days_31.includes(month)) {
      //console.log("month has 31 days");
      month_end = "31/" + month + "/" + year.toString();
    } else if (days_30.includes(month)) {
      // console.log("month has 30 days");
      month_end = "30/" + month + "/" + year.toString();
    } else {
      //  console.log("month has 28/29 days");
      month_end = "29/" + month + "/" + year.toString();
    }

    const monthlyBudget = await MonthlyBudgetModel.find({
      userID: req.query.userId,
      date: { $gte: month_start, $lte: month_end },
    });
    // console.log("monthly budget: ", monthlyBudget);
    res.json(monthlyBudget);
  }
  getMonthlyBudget();
});

app.delete("/delete-monthly-budget-card", (req, res) => {
  async function deleteMonthlyBudgetCard() {
    //delete the expense
    const monthlyBudget = await MonthlyBudgetModel.deleteOne({
      _id: req.body.cardId,
    });
    //   console.log("monthly budget: ", monthlyBudget);
    res.send("record deleted");
  }
  // console.log("req.body.cardId", req.body.cardId);
  deleteMonthlyBudgetCard();
});

app.delete("/delete-expense", (req, res) => {
  async function deleteBudget() {
    //delete the expense
    const Budget = await ExpenseModel.deleteOne({
      _id: req.body.cardId,
    });
    //   console.log("monthly budget: ", monthlyBudget);
    res.send("record deleted");
  }

  deleteBudget();
});

app.get("/filter-expense-date", (req, res) => {
  async function getExpenseByData() {
    const expenses = await ExpenseModel.find({
      userID: req.query.userId,
      date: { $gte: req.query.startdate, $lte: req.query.enddate },
    });
    console.log("first");
    res.json(expenses);
  }
  getExpenseByData();
});

app.listen(3001);
