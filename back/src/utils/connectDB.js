import mongoose from "mongoose";

const connectDB = () =>{
    try{
        const connection = mongoose.connect(process.env.MONGO_URI, {
            dbName: 'Kiwi'
        })
        console.log("Connected to the Kiwi")
    }
    catch(error){
        console.log(error)
    }
}

export default connectDB;