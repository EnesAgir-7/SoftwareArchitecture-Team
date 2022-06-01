//& bcrypt used for encryption of the password
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

module.exports.login =async (req,res,next)=>{
    //! formda girilenleri console da yazmak icin koydum
    //console.log(req.body)

    try {
        const {username,password}=req.body;
        const user =await User.findOne({username});
        if(!user)
            return res.json({message:"Incorrect username",status:false});
            //^ compare the password which was send from fround end and password which is inside the database 
            const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.json({message:"Incorrect password", status:false});
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
        const {username, email,password,address}=req.body;
        const usernameCheck =await User.findOne({username});
        if(usernameCheck)
            return res.json({message:"username already used",status:false});
        const emailCheck = await User.findOne({email})
        if(emailCheck)
            return res.json({message:"e-mail already used",status:false});
        //! if everything is perfect =>hash the password
        //? 10 is type of encryption //=> without number is not running perfectly 
        //^ hash-> the password bcrypt and sending to inside the database 
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email,
            username,
            address,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (err) {
        next(err);
    }
};

module.exports.setAvatar =async (req,res,next)=>{
    try {
        const userId = req.params.id;
        const avatarImage =req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
    } catch (err) {
        next(err)
    }
};

module.exports.getAllUsers =async (req,res,next)=>{
    try {
        //? I'm not sure about address
        //! Check again!!!
        //^ here is select all the id but not including our user id
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email","username","avatarImage","_id","address"
        ]);
        return res.json(users);
    } catch (err) {
        next(err)
    }
}
