const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();

let Query = require("../model/Query")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createQuery",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.queryTitle || req.body.queryTitle == "")) {
            return res.status(400).send({
                message : "query title cannot be empty or undefined."
            })
        }
        if ((!req.body.queryStatus || req.body.queryStatus == "")) {
            return res.status(400).send({
                message : "query status cannot be empty or undefined."
            })
        }
        if ((!req.body.queryType || req.body.queryType == "")) {
            return res.status(400).send({
                message : "query type cannot be empty or undefined."
            })
        }
        if ((!req.body.taskQueryRef || req.body.taskQueryRef == "")) {
            return res.status(400).send({
                message : "Task query reference cannot be empty or undefined."
            })
        }

        let queryData = await new Query({
            queryCode : Math.floor(Math.random() * 9000) + 1000,
            queryTitle : req.body?.queryTitle,
            queryDescription : req.body?.queryDescription,
            queryStatus : req.body.queryStatus,
            queryType : req.body?.queryType,
            taskQueryRef : req.body?.taskQueryRef,
            queryCreatedBy : req.headers?.currentUser?._id,
            queryCreatedAt : Date.now()
        }).save();
        if (queryData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the queryData data. ",
                            data : queryData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: queryData
                    }
                    )
            }
    
    } catch ( error : any ) {
        console.log("The error in post->/task controller is this : ", error);
        return res.status(500).send(
            {
                message: "Something went wron gand the issue is reported.",
                errorMessage : error
            }
        )
    }
})
router.patch("/updateQuery",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }
        if ((!req.body.queryTitle || req.body.queryTitle == "")) {
            return res.status(400).send({
                message : "query title cannot be empty or undefined."
            })
        }
        if ((!req.body.queryStatus || req.body.queryStatus == "")) {
            return res.status(400).send({
                message : "query title cannot be empty or undefined."
            })
        }
        if ((!req.body.queryType || req.body.queryType == "")) {
            return res.status(400).send({
                message : "query type cannot be empty or undefined."
            })
        }
        if ((!req.body.taskQueryRef || req.body.taskQueryRef == "")) {
            return res.status(400).send({
                message : "Task query reference cannot be empty or undefined."
            })
        }

        let queryData = await Query.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    queryCode : Math.floor(Math.random() * 9000) + 1000,
                    queryTitle : req.body?.queryTitle,
                    queryDescription : req.body?.queryDescription,
                    queryStatus : req.body.queryStatus,
                    queryType : req.body?.queryType,
                    taskQueryRef : req.body?.taskQueryRef,
                    queryUpdatedBy : req.headers?.currentUser?._id,
                    queryUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (queryData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the query data. ",
                            data : queryData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: queryData
                    }
                    )
            }
    
    } catch ( error : any ) {
        console.log("The error in post->/task controller is this : ", error);
        return res.status(500).send(
            {
                message: "Something went wron gand the issue is reported.",
                errorMessage : error
            }
        )
    }
})

router.get("/queryList", async function (req: any, res: any){
    try {
        let queryData = await Query.find({queryCreatedBy : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id)}).sort({queryCreatedAt : -1});
        if (queryData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : queryData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: queryData
                    }
                    )
            }
    
    } catch ( error : any ) {
        console.log("The error in post->/task controller is this : ", error);
        return res.status(500).send(
            {
                message: "Something went wron gand the issue is reported.",
                errorMessage : error
            }
        )
    }
})
router.delete("/deleteQuery", async function (req: any, res: any){
    try {
        // validation 
        if ((!req.query?.queryId || req.query?.queryId == "")) {
            return res.status(400).send({
                message : "Query Id cannot be empty or undefined."
            })
        }
        let queryData = await Query.findOneAndDelete({_id : mongoose.Types.ObjectId.createFromHexString(req.query.queryId)});
        if (queryData) {
                    return res.status(200).send(
                        {
                            message : "Successfully deleted the taskToDo data. ",
                            data : queryData
                        }
                        )
                    
            } else if (queryData == null){
                return res.status(500).send(
                    {
                        message : "TaskToDo with the id of  "+req.query?.query+" is already deleted.",
                        data: queryData
                    }
                    )
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: queryData
                    }
                    )
            }
    
    } catch ( error : any ) {
        console.log("The error in post->/task controller is this : ", error);
        return res.status(500).send(
            {
                message: "Something went wron gand the issue is reported.",
                errorMessage : error
            }
        )
    }
})

module.exports = router;