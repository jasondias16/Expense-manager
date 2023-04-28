const signin = (req, res) => {
  (req, res) => {
    const u_fname = req.body.fname;
    const u_lname = req.body.lname;
    const u_email = req.body.email;
    const u_pass = req.body.password;
    console.log(u_fname, u_lname, u_email, u_pass);
    //  res.send(req.body.fname);
    // res.send("successfull");

    // check if the user already signed in with the email and dont let him sign in
    //const user_already_exist =
    // User.findOne({ email: u_email }, (err, email) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send("Email already in use");
    //   }
    // });
    //  else sign in the user
    // run();
    // async function run() {
    //   const user = await User.create({
    //     fname: u_fname.trim(),
    //     lname: u_lname.trim(),
    //     email: u_email.trim(),
    //     password: u_pass,
    //   });
    //   console.log(user);
    // }
  };
};

module.exports = { signin };
