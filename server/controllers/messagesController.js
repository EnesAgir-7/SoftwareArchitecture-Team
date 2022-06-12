const Messages = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const {from,to,message} =req.body;
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
    try {
        const {from,to} = req.body;
        const messages = await messageModel.find({
            users:{
                $all:[from,to]
            },
        }).sort({updatedAt: 1});
        const projectMessages = messages.map((message)=>{
            return{
                fromSelf: message.sender.toString() ===from,
                message:message.message.text,
            };
        });
        res.json(projectMessages);
    } catch (err) {
        next(err)
    }
};