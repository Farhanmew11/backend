 import mongoose from "mongoose";
import { Schema } from "mongoose";
const blogSchema = new Schema({
firstname: {
    type : String,
    required: true
},
 lastname : {
    type: String,
    required:  true
 }
})

const user = mongoose.model('user', blogSchema)



export default user;