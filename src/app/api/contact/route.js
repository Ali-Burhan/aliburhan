import connectToDb from '@/lib/db'
import {Contact} from "@/lib/schemas/contact"
export async function GET(request) {

}

export async function POST(request) {
    const {name,phone,company,website,service,message,email} = await request.json()
    await connectToDb()

    // insert contact
    try {
        if(!name,!phone,!company,!website,!service,!message,!email){
                return Response.json({message:"Failde",status:400})
        }
        else{
            let contactNew = await new Contact({name,phone,company,website,service,message,email})
            contactNew.save()
            return Response.json({message:"Success",status:200})
        }

    } catch (error) {
        
    }
    return Response.json({message:"Success"})    
}