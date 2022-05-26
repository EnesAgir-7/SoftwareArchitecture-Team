//& brcypt used for encryption of the password
const brcypt = require("bcrypt");
const User = require("../model/userModel");

module.exports.login =async (req,res,next)=>{
    //! formda girilenleri console da yazmak icin koydum
    //console.log(req.body)

    try {
        const {password, username}=req.body;
        const user =await User.findOne({username});
        if(!user)
            return res.json({message:"Incorrect username/password",status:false});
            //^ compare the password which was send from fround end and password which is inside the database 
            const isPassword = await brcypt.hash(password,user.password);
        if(!isPasswordValid){
            return res.json({message:"Incorrect username/password", status:false})
        }
        delete user.password;
        return res.json({status: true, user});
    } catch (err) {
        next(err);
    }
};

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
        //? 10 is type of encryption //=> without number is not running perfectly 
        const hashedPassword = await brcypt.hash(password,10);
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
