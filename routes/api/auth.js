const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User model
const User = require("../../models/User");

//@route POST api/auth
//@description Authenticate user
//@access Public

router.post("/", (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //find existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User doesnt exists!" });

    //compare pwds
    bcrypt.compare(password, user.password).then((isMatch) => {
      //error handle
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              name: user.name,
              id: user.id,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

//@route GET api/auth/user
//@description Get User data
//@access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});
module.exports = router;
