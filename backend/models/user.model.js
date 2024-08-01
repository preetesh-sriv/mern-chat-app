import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female'],
        /*
        # In Mongoose, the enum option is used to validate that a value for a particular field is one of a predefined set of values. This is useful when you want to ensure that a field only contains specific values, thus preventing any invalid or unexpected data from being saved in the database.
        */
    },
    profilePic:{
        type:String,
        default: "",
    },
},  {timestamps: true}) // member since <createAt>

const User = mongoose.model('User',userSchema);

export default User;