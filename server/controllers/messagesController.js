const Messages = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const {from,to,messages} =req.body;
        const data = await MessageModel.create({
            message:{text:message},
            users:[from,to],
            //^ sequence 
            sender:from,
        });
        if(data) return res.json({message:"Message added/saved successfully..."});

    return res.json({message:"Message failed save to DB"});

    } catch (err) {
        next(err);
    }
};

module.exports.getMessages = async (req, res, next) => {
    
};