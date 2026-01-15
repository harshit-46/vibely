const express = require("express");
const router = express.Router();
const { getUserChats } = require("../controllers/chat.controller");
const isLoggedIn = require("../middlewares/isLoggedin");

router.get("/", isLoggedIn, getUserChats);

module.exports = router;
