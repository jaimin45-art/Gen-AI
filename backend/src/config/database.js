const mongoose = require("mongoose")



async function connectDB(){
    try{
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Connnected")
    }
    catch(err){
         console.error(`MongoDB Error: ${err.message}`);
    }
}

module.exports = connectDB