import { mongoose } from "../database/config";
import { Document, Schema } from "mongoose";

const regiSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    mob: String,
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});
export class regi extends mongoose.model('regi', regiSchema) {
    static insert(user: any) {
        throw new Error("Method not implemented.");
    }
    email: any;
    name: any;
    mob: any;
    pass: any;
    cpass: any;
}

