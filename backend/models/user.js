import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required:true,
        minlength: [3, "full name must be 3 character"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address',
          ],
    },
    phone:{
        type:String,
        required:true,
        match:[
            /^\d{10,13}$/, 'Phone number must be valid'
        ]
    },
    password:{
        type:String,
        required:true,
        minlength: [8, "Password must be 8 character"],
    },
    role:{
        type:String,
        enum: ['admin','customer'],
        default: 'customer'
    },
    isVerified:{
        type:Boolean,
        default:false

    },
    isBanned: { type: Boolean, default: false },

},{
    timestamps:true
});
export  default mongoose.model('User',userSchema)

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: { 
//         type: String,
//         required: true,
//         minlength: [3, "Full name must be at least 3 characters"]
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [
//             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//             "Please provide a valid email address",
//         ],
//     },
//     phone: {
//         type: String,
//         required: true,
//         match: [/^\d{10,13}$/, "Phone number must be valid"]
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: [8, "Password must be at least 8 characters"],
//     },
//     role: {
//         type: String,
//         enum: ["admin", "customer"],
//         default: "customer"
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     isBanned: {
//         type: Boolean,
//         default: false
//     },
// }, { timestamps: true });

// // Fix: Check if model exists before defining it again
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;
