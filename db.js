import mongoose from "mongoose";
const dburl  =  "mongodb://127.0.0.1:27017/testdatabase";

const connectdb = async () => {
    try  {mongoose.connect(dburl)
    .then(() => {
        console.log("hello there ddtabase i connceted ");
        
    })

}
 catch (error) {
console.log(error.message)
 }


}


export default connectdb;