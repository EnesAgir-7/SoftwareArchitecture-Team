require('dotenv').config();
const tokenSecret = process.env.TOKEN_SECRET;
const express = require('express');
const neo = require('neo4j-driver');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const socket = require("socket.io");
const http = require ('http');
const { Router } = require('express');

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const driver = neo.driver('neo4j+s://b7be1229.databases.neo4j.io', neo.auth.basic('neo4j', '_vGX2qSJ4ZV-Lah7CqadE8XkvNpDI8N00G8AlKrHhz8'));

server.listen(5000,()=>{console.log("Server started on 5000")});


app.post('/register', async(req,res)=>{
    const {username, password, email, firstName, lastName, city} = req.body;
    const session = driver.session();
    const existingCheck = await session.run(`MATCH (P:Person) WHERE P.email='${email}' or P.username = '${username}' RETURN (P.username), (P.email)`);
    if(existingCheck.records.length>0){
        if(existingCheck.records[0]._fields[0]===req.body.username)
        return res.json({message:"Username already in use", status:false})
        else
        return res.json({message:"email already in use", status:false});
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    await session.run(`CREATE (P:Person{firstName:"${firstName}", lastName:"${lastName}", username: "${username}", city:"${city}", email:"${email}", password:"${hashedPassword}"})`);
    //await session.run(`CREATE (P:Person{username:"${username}", password:"${hashedPassword}", email:"${email}", address:"${address}"})`);
    const reply  = await session.run(`MATCH (P:Person{username:'${username}'}) RETURN (P)`);
    const user = reply.records[0]._fields[0].properties;
    session.close();
    const token = jwt.sign(username, tokenSecret);
    user.token = token;
    delete user.password;
    return res.json({status:true, user});
})

app.post('/', async(req,res)=>{
    const {username, password} =req.body;
    const session = driver.session();
    const loginCreds = await session.run(`MATCH (P:Person{username:'${username}'}) RETURN (P.password)`)
    if (loginCreds.records.length===0){
        return res.json({message:"Invalid username", status:false});
    }
    const hashedPassword = loginCreds.records[0]._fields[0];
    const passCheck = await bcrypt.compare(password,hashedPassword);
    if(!passCheck){
        return res.json({message:"Incorrect password", status:false});
    }
    const reply  = await session.run(`MATCH (P:Person{username:'${username}'}) RETURN (P)`);
    const token = jwt.sign(username, tokenSecret);
    const user = reply.records[0]._fields[0].properties;
    const id = await session.run(`MATCH (P:Person{username:'${username}'}) RETURN ID(P)`);
    user._id = id.records[0]._fields[0].low;
    user.id = id.records[0]._fields[0].low;
    session.close();
    user.token = token;
    delete user.password;
    return res.json({status:true, user});
})

app.post('/setAvatar/:id', async(req,res)=>{
    const username = req.params.id;
    const avatarImage = req.body.image;
    const session = driver.session();
    const reply = await session.run(`MATCH (P:Person{username:'${username}'}) SET P.isAvatarImageSet = true, P.avatarImage = '${avatarImage}' RETURN (P)`);
    const userData = reply.records[0]._fields[0].properties;
    session.close();
    return res.json({isSet:userData.isAvatarImageSet, image:userData.avatarImage});
})

app.get('/allusers/:id', async(req,res)=>{
    const username = req.params.id;
    const session = driver.session();
    const reply = await session.run(`MATCH (P:Person) WHERE P.username<>'${username}' RETURN (P)`);
    const id = await session.run(`MATCH (P:Person) WHERE P.username<>'${username}' RETURN ID(P)`);
    const users = [];
    for(let i=0;i<reply.records.length;i++){
        const userData = reply.records[i]._fields[0].properties;
        delete userData.password;
        userData._id = id.records[i]._fields[0].low;
        users.push(userData);
    }
    session.close();
    return res.json(users);
})

app.post('/getuser', async(req, res)=>{
    const {savedToken} = req.body;
    const username = jwt.verify(savedToken, tokenSecret);
    const session = driver.session();
    const reply = await session.run(`MATCH (P:Person{username:'${username}'}) RETURN (P)`);
    const user = reply.records[0]._fields[0].properties;
    const id = await session.run(`MATCH (P:Person{username:'${username}'}) RETURN ID(P)`);
    const _id = id.records[0]._fields[0].low;
    session.close();
    delete user.password;
    user._id = _id;

    return res.json(user);
})

app.post('/dummy', async(req,res)=>{
    const {from, to} = req.body;
    const session = driver.session();
    const replyFrom = await session.run(`MATCH (P:Person{username:'${from}'}) RETURN ID(P)`);
    const replyTo = await session.run(`MATCH (P:Person{username:'${to}'}) RETURN ID(P)`);

    const fromID = replyFrom.records[0]._fields[0].low;
    const toID = replyTo.records[0]._fields[0].low;

    session.close();
    /*
    conversation table
    ------------------
    id int
    user1 int
    user2 int
    last_message datetime

    conversation_message
    ---------------------
    conversation_id int
    message_text text|varchar(255)|string
    sender_id int
    date  datetime
    */
    return res.json({fromID, toID});
});

// const server = server.listen("3001",()=>{
//     console.log(`Server Started on Port ${process.env.PORT}`);
// })



mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("MongoDb connection Success");
    })
    .catch((err)=>{
        console.log(err.message);
});



//^ message model



const MessageSchema = new mongoose.Schema({
    message: {
        text: { type: String, required: true },
    },
    users: [mongoose.Schema.Types.Number],
    sender: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
},
//^ to sort messages
{timestamps: true,}
);
const MessageModel = mongoose.model('MessageModel',MessageSchema);

    


const getAllMessage = async (req, res) => {
    try {
        const {from,to} =req.body;
    const message = await MessageModel.find({
        users:{
            $all:[from,to],
        },
    })
    .sort({updatedAt:1});
    const projectedMessages = messages.map((msg) => {
        return {
            fromSelf: (msg.sender === from),
            message: msg.message.text,
        };
    });
    res.json(projectedMessages);
} catch (err) {
    console.log(err);
}
};

app.post('/message/addMsg',async(req, res)=>{
    try {
        let {from,to,message} =req.body;
from = parseInt(from);
to = parseInt(to);
        const data = await MessageModel.create({
        message:{text:message},
        users:[from,to],
        //^ sequence 
        sender:from,
    });
    console.log(message);
    if(data) return res.json({message:"Message added/saved successfully..."});
    
    return res.json({message:"Message failed save to DB"});
    
} catch (err) {
    console.log(err);
    return res.json({message: ''});
}
})

app.post('/messages/getMsg', async (req, res) => {
    try {
        let {from,to} = req.body;

        const messages = await MessageModel.find({
            users:{
                $all:[from,to]
            },
        }).sort({updatedAt: 1});
        const projectMessages = messages.map((messages)=>{
    
            return{
                fromSelf: (messages.sender ===from),
                message:messages.message.text,
            };
        });
        res.json(projectMessages);
    } catch (err) {
        console.log(err)
    }
});



const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});


global.onlineUsers = new Map();

//? i don't know fromID  but we need to use userID
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(fromID)=>{
        onlineUsers.set(fromID,socket.id);
    });

    socket.on("send-message",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        //console.log(data);
        //^If user is online
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("message-receive",data.message);
            console.log(socket);
        }
    })
})
app.post('/questionnaire', async (req, res) => {
    const interestArray=[];
    const { userName, value } = req.body;
    const interests = value.split(",");
    const ses = driver.session();
    const resp = await ses.run(`MATCH(I:Interest) RETURN (I)`);
    resp.records.forEach(rec => interestArray.push(rec._fields[0].properties.name));
    ses.close();
    interests.forEach(async (interest) => {
        const session = driver.session();
        const intPresent = interestArray.findIndex(rec => rec === interest);
        if (intPresent === -1) {
            const newInterest = await session.run(`CREATE (I:Interest{name:'${interest}'}) RETURN (I)`);
        }
        const alreadyInterested = await session.run(`MATCH (P:Person{username:'${userName}'}),(I:Interest{name:'${interest}'}) RETURN EXISTS((P)-[:Interested]->(I))`);
        if (alreadyInterested.records[0]._fields[0]) {
            console.log("already interested");
        }
        else {
        const intUpdate = await session.run(`MATCH (P:Person{username:'${userName}'}),(I:Interest{name:'${interest}'}) CREATE (P)-[:Interested]->(I)`);
        session.close();
        }
    });
    return res.json({ data: "Received" });
});


app.post('/sameinterests', async (req, res) => {
    const { username } = req.body;
    const interestArray = [];
    const peopleArray = [];
    const ses = driver.session();
    const resp = await ses.run(`MATCH(P:Person{username:'${username}'})-[:Interested]->(I:Interest) RETURN (I)`);
    resp.records.forEach(rec => interestArray.push(rec._fields[0].properties.name));
    ses.close();
    let queryString = '';
    interestArray.forEach(interest => {
        queryString = queryString + `I.name='${interest}'`;
        if (interestArray.indexOf(interest) !== interestArray.length - 1) {
            queryString = queryString + ' OR ';
        }
    })
    const session = driver.session();
    const people = await session.run(`MATCH (P:Person),(I:Interest) WHERE ${queryString} MATCH (P)-[:Interested]->(I) RETURN COLLECT(DISTINCT P)`);
    people.records[0]._fields[0].forEach(field => {peopleArray.push(field.properties)});
    let delIndex;
    for (let i = 0; i < peopleArray.length; i++) {
        if(peopleArray[i].username === username)
            delIndex = i;
        delete peopleArray[i].password;
    } 
    peopleArray.splice(delIndex,1);
    return res.json({ peopleArray });
})


app.put('/personalData',async(req,res)=>{
    const{username, firstName, lastName, email, city} = req.body;
    const session = driver.session();
    const sender = currentUser.username;
    const receiver = friend.username;
    const reply = await session.run(`MATCH (P:Person{username:'${sender}'}), (F:Person{username:'${receiver}'}) CREATE (P)-[:Friend]->(F)`);
    return res.json({"Reply": "Request Sent"});
})

app.post('/addBio', async(req, res)=>{
    console.log(req.body);
    const {username, isBio} = req.body;
    const session = driver.session();
    const reply = await session.run(`MATCH (P:Person{username:'${username}'}) SET P.bio = '${isBio}' RETURN (P)`);
    session.close();
    return res.json({status:"ok"});
})

app.post('/addEvents', async(req,res) => {
    console.log(req.body);
    const {eventName, description, date , time , location, contact} =req.body;
    const session = driver.session();
    const reply =await session.run(`CREATE (E:Event{name:'${eventName}' ,description:'${description}', date:'${date}', time:'${time}', location:'${location}', contact:'${contact}'}) RETURN (E)`);
    session.close();
    return res.json({reply:"Updated succesfully"});

})
app.get('/allEvents',async(req,res)=>{
    const session = driver.session();
    const reply = await session.run(`MATCH (E:Event) RETURN (E)`);
    const events =[];
    reply.records.forEach(rec=>{events.push(rec._fields[0].properties)});
    console.log(events);
    return res.json({events});
})