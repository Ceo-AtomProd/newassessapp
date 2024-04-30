import dbConnect from "@/libs/db";
import Assess from "@/models/assess";

await dbConnect();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { type } = await req.query;
        if (type === "all") {
          const { page, filter, search } = await req.query;
          let conditions = {};
        const pageSize = 6;
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber - 1) * pageSize;
        if (filter) {
          conditions.category = filter;
        }
        if (search) {
          conditions.$or = [
            { title: { $regex: new RegExp(search, "i") } }, 
            { description: { $regex: new RegExp(search, "i") } }, 
            { options: { $regex: new RegExp(search, "i") } },
            { questions: { $regex: new RegExp(search, "i") } },
          ];
        }
        const assess = await Assess.find(conditions)
          .skip(skip)
          .limit(pageSize)
          .sort({ _id: -1 })
          .exec();
        const totalAssess = await Assess.countDocuments(conditions);

        res.status(200).json({
          success: true,
          allAssess: assess,
          currentPage: pageNumber,
          totalAssess: totalAssess,
          totalPages: Math.ceil(totalAssess / pageSize),
        });
      }
      if (type === 'single') {
        const { _id } = await req.query;
        if (_id.length !== 24) {
          res.status(400).json({error:"Invalid Assessment Id"})
        }
        const assess = await Assess.findById(_id);
        if (!assess || assess.length === 0) {
          res.status(404).json({error:"Assessment not found with this Id"});
        }
        res.status(200).json({
          success: true,
          assess,
        });
      }
    }else{
      res.status(405).json({error:"Method not allowed"});
    }

}
  