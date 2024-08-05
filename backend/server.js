import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import userRoute from './routes/user.route.js'
import connectToMongoDB from './db/connectTOMongoDB.js';
import { app ,server } from './socket/socket.js'; //since we have written app in socket.js so we need to import it here
/*
# dotenv is a popular package used in Node.js applications to manage environment variables. It allows you to define environment-specific variables in a .env file and makes them accessible in your application through process.env.
*/
// const app = express(); we have added this is socket.js

const PORT = process.env.PORT || 5000;
dotenv.config();


app.use(express.json());
app.use(cookieParser());
// #The line app.use(express.json()); is used in an Express.js application to parse incoming JSON payloads. This middleware function is part of the express package and is used to handle JSON data sent in the body of HTTP requests.

app.use('/api/auth',authRoute)
// # Whenever we go to /api/auth route , authRoute is called
app.use('/api/messages',messageRoute)
app.use('/api/users',userRoute)

// app.get('/',(req,res)=>{
//    //root route http://localhost:5000/
//    res.send('Hello World!!!!!!!!!!!')
// })


server.listen(PORT,() => { //server.listen because due to socket.io
   connectToMongoDB();
  console.log(`Server running on port ${PORT}`)
})