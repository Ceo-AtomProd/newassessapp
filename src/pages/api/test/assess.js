import dbConnect from "@/libs/db";
import AssessResponse from "@/models/assessRes";

await dbConnect();

export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const {_id} = await req.query
            if (_id.length !== 24) {
             return res.status(400).json({error:"Assessment id is invalid"})
            }
            const assessData = await AssessResponse.findOne({_id}).populate('assessId')
            if (assessData===null) 
            {
             return res.status(404).json({error:"Assessment Not Found"})
            }
            return res.status(200).json({success:true,assessData})
        } catch (error) {
            return res.status(400).json({error:"Internal Server Error",error})
        }
    }
    if (req.method === 'PUT'){
        try {
            const {_id, testresult} = await req.body
            console.log(_id, testresult);
            if (_id.length !== 24) {
             return res.status(400).json({error:"Assessment id is invalid"})
            }
            await AssessResponse.updateOne({_id},{
                $set:{
                    testresult,
                    isComplete:true
                }
            })
            return res.status(200).json({message: "Assessment Done Successfully"})
        } catch (error) {
            
        }
    }
    else{
        return res.status(405).json({error:"Method Not Allowed"})
    }

}