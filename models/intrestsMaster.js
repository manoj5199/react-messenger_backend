import mongoose, { Schema, model } from "mongoose";

const InterestMasterSchema = new Schema({
    Interest : {
        type : String,
        required: true
    },
    Description : {
        type : String
    },
    createdDate : {
        type : Date,
        default : Date.now()
    },
    updatedDate : {
        type : Date,
        default : Date.now()
    }
})

const InterestMaster = model('interestMaster',InterestMasterSchema);
export default InterestMaster;
