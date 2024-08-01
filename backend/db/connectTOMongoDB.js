import mongoose from 'mongoose';


const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        /*
        The line await mongoose.connect(process.env.MONGO_DB_URI); is used to establish a connection to a MongoDB database using the mongoose library. Here is a detailed explanation of what it does:

        Breakdown of the Code:
        await:

        This keyword is used to pause the execution of the async function until the Promise returned by mongoose.connect() is resolved.
        It ensures that the connection to the database is completed before moving on to the next line of code.
        mongoose.connect():

        This is a method provided by the mongoose library to connect to a MongoDB database.
        It returns a Promise, which resolves when the connection is successfully established and rejects if there is an error.
        process.env.MONGO_DB_URI:

        This retrieves the value of the MONGO_DB_URI environment variable.
        The dotenv package is usually used to load environment variables from a .env file into process.env.
        */
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB',error.message)
    }
}
export default connectToMongoDB;