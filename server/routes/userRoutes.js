const ctrl = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register",ctrl.register);
router.post("/login",ctrl.login);
router.post("/setAvatar/:id",ctrl.setAvatar);

router.get("/allusers/:id",ctrl.getAllUsers);
router.get('/dummy', async (req,res,next)=>{
    try {
        return res.json({dummy: 1})
    } catch (err) {
        next(err)
    }
});

module.exports = router;