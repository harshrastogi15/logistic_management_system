const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// require('dotenv').config();
// const { body, validationResult } = require("express-validator");
const User = require("../model/user");
const jwtaccess = require("../middleware/authaccess");
const router = express.Router();


router.post(
  "/signup",
  async (req, res) => {
    // console.log(req.body);
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res.status(400).json({ status: -1 });
      }
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        // console.log(hash)
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
          password: hash,
          phone: req.body.phone,
          pincode : req.body.pincode
        })
          .then((user) => {
            // console.log(user);
            data = {
              id: user._id
            }
            var authtoken = jwt.sign(data, process.env.JWT_TOKEN);
            res.status(200).json({ status: 0, authtoken })
          })
          .catch((error) => res.status(400).json({ status: -1 }));
      });
    } catch (error) {
      res.status(500).json({  error:error, status: -2 });
    }
  }
);



router.post(
  "/login",
  async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ status: -1 })
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        data = {
          id: user._id
        }
        var authtoken = jwt.sign(data, process.env.JWT_TOKEN);
        res.status(200).json({ status: 0, authtoken });
      } else {
        return res.status(400).json({ status: -1 });
      }

    } catch (error) {
      res.status(500).json({ status: -2 });
    }
  }
);

router.post('/access', jwtaccess, async (req, res) => {
  try {
    var data = {
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      pincode: user.pincode
    }
    res.json({ status: 0, data });
  } catch (error) {
    res.status(500).json({ status: -2 });
  }
})

router.post('/update', jwtaccess, async (req, res) => {
  try {
    var user = await User.findOneAndUpdate({_id:req.userid}, {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      pincode: req.body.pincode
    });
    res.json({ status: 0 });
  } catch (error) {
    res.json({ status: -2 });
  }
})

module.exports = router;