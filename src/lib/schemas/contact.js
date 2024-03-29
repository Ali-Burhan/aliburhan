import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    company:{
        type:String
    },
    webiste:{
        type:String
    },
    service:{
        type:String
    },
    message:{type:String}
})

export const Contact = mongoose.models.contact || mongoose.model("contact",contactSchema)