import { register } from "../controllers/usersController";

const router = request("express").Router();

router.post("/register",register);

module.exports = router;