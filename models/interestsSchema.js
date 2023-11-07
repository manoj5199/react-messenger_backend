import {Schema,Types,model} from "mongoose";

const InterestSchema = new Schema({
    UserId : {
        type : Types.ObjectId,
        required : true
    },
    Interests : {
        type : Array,
        required : true
    },
    createdDate : {
        type : Date,
        default : Date.now()
    },
    updatedDate : {
        type : Date,
        default : Date.now()
    },
})

const Interest = model('interests',InterestSchema);
export default Interest;