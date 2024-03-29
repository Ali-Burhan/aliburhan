import mongoose from 'mongoose'

let client = null

async function connectToDb() {
    try {
        if(client){
            return client
        }    
        let connection = await mongoose.connect(process.env.MONGO_URI).then(()=>{
        }).catch((err)=>{
            console.log(err);
        })
        client = connection
        return client
    } 
    catch (error) {
        console.log(error);
    }
}

export default connectToDb