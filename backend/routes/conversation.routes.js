const express = require("express");
const router = express.Router();
const { getOrCreateConversation , getConversationById,} = require("../controllers/conversation.controller");
const isLoggedIn = require("../middlewares/isLoggedin");

router.post("/", isLoggedIn, getOrCreateConversation);

router.get("/:conversationId", isLoggedIn, getConversationById);

module.exports = router;