const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User_model");

const router = express.Router();

router.post("/signup", async (req, res) => {

const { username, password } = req.body;
const user = await UserModel.findOne({ username });
    if (user) {
        return res.status(400).json({ error: "User already exists. Please try again." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();
            res.json({ message: "User has been successfully registered." });
    }catch (error) {
        console.error(error)
    }
});

router.post("/login", async (req, res) => {
const { username, password } = req.body;
const user = await UserModel.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: "User Doesn't Exist" });
    }

    try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
            return res.status(400).json({ error: "Wrong login combination." });
            }

        const token = jwt.sign({ id: user._id }, process.env.SECRET);
            res.json({ token, userID: user._id });
    }catch (error) {
        res.status(400).json({ error: "Login failed. Please try again." });
    }
});
   
module.exports = router;