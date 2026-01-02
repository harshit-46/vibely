require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.redirect("/");
        }
        req.user = user;
        next();
    } catch (err) {
        return res.redirect("/");
    }
};

module.exports = isLoggedIn;