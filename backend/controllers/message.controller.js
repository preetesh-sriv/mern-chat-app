import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"; //I forgot to import Message

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id; //We can do this due to protectRoute.js

        let conversation = await Conversation.findOne({
            participants:{ $all: [senderId , receiverId]} //mongoose syntax : find a conversation where paticipants [] contains these two fields
        })
        if(!conversation){ //if there is no conversation then create one
            conversation = await Conversation.create({
                participants: [senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //SOCKET.IO functinality to add here

        // await conversation.save();

        // await newMessage.save(); //MUST remeber to save in the DB
        // The below will run in parellel while above will run one after the other
        await Promise.all([conversation.save() , newMessage.save()]);
        res.status(201).json({newMessage});
    } catch (error) {
        console.log("Error in sendMessage controller:",error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const getMessage = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId,userToChatId]}
        }).populate('messages') // Not reference  but the message itself
        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        /*
        In Mongoose, a MongoDB object modeling tool for Node.js, the .populate method is used to replace a specified path in a document with the actual document(s) from another collection. 
        It allows you to retrieve related documents in a single query, effectively performing a join operation in a relational database.
        We'll get all the msgs in object type.
        */
        res.status(200).json(messages); // # use {} inside json() if you are sending object .If you are sending a single value then no need to use {}
    } catch (error) {
        console.log("Error in getMessage controller",error.message);
        res.status(500).json({error: "Internal server error"});
    }
}