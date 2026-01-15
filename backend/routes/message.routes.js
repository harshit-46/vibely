const express = require("express");
const router = express.Router();
const {
    getConversationMessages,
} = require("../controllers/message.controller");
const isLoggedIn = require("../middlewares/isLoggedin");

router.get("/:conversationId", isLoggedIn, getConversationMessages);

module.exports = router;