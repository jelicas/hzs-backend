import mongoose from "mongoose";

export const database = {
    initialize() {

        const db = mongoose.connection;

        //Once our connection opens, our callback will be called.  
        db.once("open", (_) => {
            console.log("Database connected.");
        });

        db.on("error", (err) => {
            console.error("Connection error.");
        });

        return mongoose.connect(process.env.MONGO_URL);
    },

}; 