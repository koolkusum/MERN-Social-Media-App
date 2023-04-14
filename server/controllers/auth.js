import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
/* REGISTER USER */
export const register = async (req, res) => {
    try {
        //send these to the front end (these arguments)
      const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
      } = req.body;
  
      //creating a encrytion to encrypt out password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      //creating a json web token after salt
      //user dashboard stuff
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash, //not storing real password for security reasons
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),//randomized
        impressions: Math.floor(Math.random() * 10000),///randomized
      });
      //saving user
      const savedUser = await newUser.save();
      //sending a user back if successful with status code 201
      //make json of user
      res.status(201).json(savedUser);
    } catch (err) {
        //on failure
      res.status(500).json({ error: err.message });
    }
  };
  
  /* LOGGING IN */
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };