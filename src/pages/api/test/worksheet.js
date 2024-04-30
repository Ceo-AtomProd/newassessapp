const datemaker = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}

import dbConnect from "@/libs/db";
import WorksheetResponse from "@/models/worksheetRes";
await dbConnect();

export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const {_id} = await req.query
            if (_id.length !== 24) {
             return res.status(400).json({error:"Worksheet id is invalid",error})
            }
            const worksheetData = await WorksheetResponse.findOne({_id}).populate('worksheetId')
            if (worksheetData===null) 
            {
             return res.status(404).json({error:"Worksheet Not Found"})
            }
            return res.status(200).json({success:true,worksheetData})
        } catch (error) {
            return res.status(400).json({error:"Internal Server Error",error})
        }
    }
    if (req.method === 'PUT'){

        try {
            const {_id, answers} = await req.body
            if (_id.length !== 24) {
             return res.status(400).json({error:"Worksheet id is invalid"})
            }
            console.log();
           await WorksheetResponse.updateOne({_id},{
                $push:{
                  columns:{answers,date:datemaker()},
                }
            })
            return res.status(200).json({message: "Successfully field data in worksheet"})
        } catch (error) {   
        }

    }
    else{
        return res.status(405).json({error:"Method Not Allowed"})
    }

}