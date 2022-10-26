const db = require("../util/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  var Role = "Super Admin";

  db.execute("SELECT * FROM users WHERE user_email='" + email + "'")
    .then((result) => {
      // res.status(200).json(result[0]);
      if (result[0].length == 0) {
        if (confirmPassword == password) {
          const salt = 12;
          bcrypt.hash(password, salt, function (err, hash) {
            db.execute(
              "INSERT INTO users(user_name, user_email, user_password, user_role) VALUES (?, ?, ?, ?)",
              [userName, email, hash, "Sales"]
            ).then(() => {
              // Generating JWT
              const userJwt = jwt.sign(
                {
                  userName: userName,
                  email: email,
                  role: Role,
                },
                "PROPLAST"
              );
              req.session.jwt = userJwt;
              res.status(200).json({ message: "signedup" });
            });
          });
        } else {
          res.status(200).json({ message: "confirm password please" });
        }
      } else {
        res.status(200).json({ message: "email already exist" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.execute("SELECT * FROM users WHERE user_email='" + email + "'")
    .then((result) => {
      if (!result) {
        return res.redirect("/login");
      } else {
        bcrypt.compare(
          password,
          result[0][0].user_password,
          function (err, verify) {
            if (verify) {
              const userJwt = jwt.sign(
                {
                  userName: result[0][0].user_name,
                  email: result[0][0].user_email,
                  role: result[0][0].user_role,
                },
                "PROPLAST"
              );
              req.session.jwt = userJwt;
              return res
                .status(200)
                .json({ message: "Signed In", jwt: userJwt });
            } else {
              res
                .status(200)
                .json({ message: "incorrect password", result: result[0] });
            }
          }
        );
      }
    })
    .catch((err) => console.log(err));
};
