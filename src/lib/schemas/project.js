import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    category:{
        type:String,
    },
    image:{
        type:Buffer,
    },
    description:{
        type:String
    },
    githubUrl:{
        type:String
    },
})

export const Project = mongoose.models.project || mongoose.model("project",projectSchema)