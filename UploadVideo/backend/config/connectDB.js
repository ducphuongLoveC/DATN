import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/test')
        .then(() => {
            console.log('connected to mongodb');
        })
        .catch((error) => {
            console.log(error);
        })
}
export default connectDB;