import mongoose,{Schema} from "mongoose";

const Users = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }          
})

const User = mongoose.model('users',Users);

export { User };