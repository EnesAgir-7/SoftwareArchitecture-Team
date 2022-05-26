import { login, register } from "../controllers/usersController";

const router = request("express").Router();

router.post("/register",register);
router.post("/login",login);

module.exports = router;