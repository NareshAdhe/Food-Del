import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cartData: {
        type:Object,
        default:{}
    },
});

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;