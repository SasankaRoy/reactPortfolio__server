const router = require("express").Router();
const User = require("../Database/User");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

// signin route
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ userExist: "user already exist" });
      return;
    }

    const encodedPassword = Crypto.AES.encrypt(
      //hashing the password
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: encodedPassword,
    });
    newUser.save();

    res.status(200).json({ success: "account has been created successfully" });

    return;
  } catch (error) {
    console.error(error);
  }
});

const Mware = async (req, res, next) => {
  if (req.body.userToken) {
    const decoded = jwt.verify(req.body.userToken, process.env.SECRET_KEY);
    const findUser = await User.findById(decoded.id);
    req.user = findUser;
    next();
  } else next();
};

// login route
router.post("/login", Mware, async (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const checkPassword = Crypto.AES.decrypt(
          //decodeing the saved password and matching it.
          user.password,
          process.env.SECRET_KEY
        );
        const realPassword = checkPassword.toString(Crypto.enc.Utf8);
        if (realPassword === req.body.password) {
          const token = jwt.sign(
            {
              id: user._id,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1day",
            }
          );
          req.session.userToken = token;
          res.status(200).json({ user, token });

          return;
        } else {
          res.status(400).json({ error: "check the password" });
          return;
        }
      } else {
        res.status(401).json({ error: "no user available" });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
