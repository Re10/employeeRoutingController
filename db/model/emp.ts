import { mongoose } from "../database/config";
import { Document, Schema } from "mongoose";

const empSchema: Schema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mob: String,
    dob: Date,
    addr: String,
    state: String,
    city: String,
    zip: String,
    gender: String,
    hobbies: Array,
    skills: Array,
    salary: String,
    myImg: String
});
export class emp extends mongoose.model('emp', empSchema) { }


