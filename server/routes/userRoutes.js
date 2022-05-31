const ctrl = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register",ctrl.register);
router.post("/login",ctrl.login);
router.post("/setAvatar/:id",ctrl.setAvatar);

module.exports = router;