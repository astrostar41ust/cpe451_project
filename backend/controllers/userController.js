const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  signin: async (req, res) => {
    const { googleId, name, givenName, familyName, email, picture, password } =
      req.body;
    try {
      if (googleId) {
        const userGoogle = await userModel.findOne({
          userType: "google",
          email,
        });
        if (!userGoogle) {
          const newUser = new userModel({
            userType: "google",
            googleId,
            name,
            givenName,
            familyName,
            email,
            picture,
          });
          console.log("before saving")
          await newUser.save();
          console.log("after saving")
          const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.json({ token });
        }
        const token = jwt.sign(
          { userId: userGoogle.id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.json({ token });
      } else {
        const user = await userModel.findOne({ userType: "normal", email });

        if (!user) {
          return res.status(400).json({
            message: "Sorry, looks like that’s the wrong email or password. ",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            message: "Sorry, looks like that’s the wrong email or password. ",
          });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.json({ token });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const user = await userModel.findOne({ userType: "normal", email });

      if (user) {
        return res.status(409).json({ message: "User already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new userModel({
        userType: "normal",
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  profile: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await userModel.findById(userId).select("-password");

      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  
};

module.exports = userController;
