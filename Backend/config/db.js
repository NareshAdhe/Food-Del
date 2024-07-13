import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nareshadhe:naresh@cluster0.lhbqvph.mongodb.net/food-del')
    .then(() => {
        console.log("DB Connected");
    })
    .catch((error) => {
        console.log(error);
    })
}