import { NextRequest } from "next/server";
import {Project} from '@/lib/schemas/project'
import connectToDb from '@/lib/db'

export async function POST(request:NextRequest) {
await connectToDb()
    const form:FormData = await request.formData()
    const title = form.get('title')
    const category = form.get('category')
    const description = form.get('description')
    const githubUrl = form.get('githubUrl')
    const image:File = form.get('image') as File

    const byte = await image.arrayBuffer()
    const buffer = Buffer.from(byte)

    try {
        const oldProjects = await Project.findOne({title,category,githubUrl})
        if (oldProjects) return Response.json({status:402})
        const newProject = await new Project({title,category,description,image:buffer,githubUrl})
    await newProject.save()
    return Response.json({status:200})
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        return Response.json({status:500})
    }
}


export async function GET() {
    try {
        await connectToDb()
        const projects = await Project.find()
        return Response.json({status:200,projects})
    } catch (error) {
        
    }
}