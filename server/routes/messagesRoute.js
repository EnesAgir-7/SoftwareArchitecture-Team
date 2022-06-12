const { addMessage, getMessages } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addMsg/", addMessage);
router.post("/getMsg/", getMessages);

module.exports = router;