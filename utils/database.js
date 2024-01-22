import mongoose from "mongoose";
let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log("Database is Connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI , {
            dbName: 'Promptopia',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;

    } catch (error) {
        console.log(error);
    }
}