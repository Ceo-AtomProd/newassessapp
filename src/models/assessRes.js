import mongoose,{Schema} from "mongoose";
import User from "./user";
import Assess from "./assess";

const assessResponseSchema = new mongoose.Schema({
 createrUserId:{
    type:Schema.ObjectId,
    ref:User,
    index:true,
    required:true
 },
 name:{
    type:String,
    required:true
 },
 dob:{
    type:String,
    required:true
 },
 assessId:{
    type:Schema.ObjectId,
    ref:Assess,
    index:true,
    required:true
 },
 isComplete:{
    type:Boolean,
    default:false,
    required:true
 },
 testresult:{
    score:{
        type:Number,
    },
    status:{
        type:String,
    }
 }

},
{timestamps:true}
)

const AssessResponse = mongoose.models.AssessResponse || mongoose.model("AssessResponse", assessResponseSchema);
export default AssessResponse;