const express = require("express");
const router = express.Router();
const { getOrCreateConversation } = require("../controllers/conversation.controller");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/", isLoggedIn, getOrCreateConversation);

module.exports = router;