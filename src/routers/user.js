const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../utils/auth");
const logger = require("../utils/logger");

const User = require("../models/user");

/**
 * @method - POST
 * @param - /register
 * @description - Register a new user
 */

router.post(
  "/register",
  [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    }),
    check("description", "Please enter a description")
  ],
  async (req, res) => {
    logger.info(`POST /user/register from ${req.ip}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { username, password, description, name } = req.body;
    try {
      let user = await User.findOne({
        username
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        username,
        password,
        description,
        name
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      logger.error("Error in Saving", err);
      res.status(500).send("Error in Saving");
    }
  }
);

/**
 * @method - POST
 * @description - Login a user
 * @param - /user/login
 */

router.post(
  "/login",
  [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    logger.info(`GET /user/login from ${req.ip}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { username, password } = req.body;
    try {
      let user = await User.findOne({
        username
      });

      if (!user)
        return res.status(400).json({
          message: "User doesn't exist or Incorrect password"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "User doesn't exist or Incorrect password"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      logger.error("Server Error", err);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

/**
 * @method - GET
 * @description - Get all data about logged in user
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
  logger.info(`GET /user/me from ${req.ip}`);

  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    logger.error("Error in Fetching user", err);
    res.status(400).send("Error in Fetching user");
  }
});


router.put("/name", auth, async (req, res) => {
  logger.info(`PUT /user/name from ${req.ip}`);

  try {
    const user = await User.findById(req.user.id);
    user.name = req.body.name;

    await user.save();
    res.status(200).send({ name: req.body.name });
  } catch (err) {
    logger.error("Error in Saving", err);
    res.status(500).send("Error in Saving");
  }
});

module.exports = router;
