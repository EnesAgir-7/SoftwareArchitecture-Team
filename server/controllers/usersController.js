//& brcypt used for encryption of the password
const brcypt = require("bcrypt");
const User = require("../model/userModel");

module.exports.register =async (req,res,next)=>{
    //! formda girilenleri console da yazmak icin koydum
    //console.log(req.body)

    try {
        const {username, email,password}=req.body;
        const usernameCheck =await User.findOne({username});
        if(usernameCheck)
            return res.json({message:"username already used",status:false});
        const emailCheck = await User.findOne({email})
        if(emailCheck)
            return res.json({message:"e-mail already used",status:false});
        //! if everything is perfect =>hash the password
        //? 12 is type of encryption //=> without number is not running perfectly 
        const hashedPassword = await brcypt.hash(password,12);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (err) {
        next(err);
    }
};
