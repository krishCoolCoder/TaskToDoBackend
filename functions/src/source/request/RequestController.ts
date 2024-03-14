const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();

let Request = require("../model/Request")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createRequest",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.requestTitle || req.body.requestTitle == "")) {
            return res.status(400).send({
                message : "request title cannot be empty or undefined."
            })
        }
        if ((!req.body.requestStatus || req.body.requestStatus == "")) {
            return res.status(400).send({
                message : "request Status cannot be empty or undefined."
            })
        }
        if ((!req.body.requestType || req.body.requestType == "")) {
            return res.status(400).send({
                message : "request type cannot be empty or undefined."
            })
        }

        let requestData = await new Request({
            requestCode : Math.floor(Math.random() * 9000) + 1000,
            requestTitle : req.body?.requestTitle,
            requestDescription : req.body?.requestDescription,
            requestStatus : req.body.requestStatus,
            requestType : req.body?.requestType,
            requestTeamRef : req.body?.requestTeamRef ,
            requestOrganisationRef : req.body?.requestOrganisationRef,
            requestCreatedBy : req.headers?.currentUser?._id,
            requestCreatedAt : Date.now()
        }).save();
        if (requestData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the requestData data. ",
                            data : requestData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: requestData
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
router.patch("/updateRequest",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }
        if ((!req.body.requestTitle || req.body.requestTitle == "")) {
            return res.status(400).send({
                message : "Request title cannot be empty or undefined."
            })
        }
        if ((!req.body.requestStatus || req.body.requestStatus == "")) {
            return res.status(400).send({
                message : "request title cannot be empty or undefined."
            })
        }
        if ((!req.body.requestType || req.body.requestType == "")) {
            return res.status(400).send({
                message : "request type cannot be empty or undefined."
            })
        }

        let requestData = await Request.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    requestCode : Math.floor(Math.random() * 9000) + 1000,
                    requestTitle : req.body?.requestTitle,
                    requestDescription : req.body?.requestDescription,
                    requestStatus : req.body.requestStatus,
                    requestType : req.body?.requestType,
                    requestTeamRef : req.body?.requestTeamRef,
                    requestOrganisationRef : req.body?.requestOrganisationRef,
                    requestUpdatedBy : req.headers?.currentUser?._id,
                    requestUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (requestData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the query data. ",
                            data : requestData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: requestData
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

router.get("/requestList", async function (req: any, res: any){
    try {
        let requestData = await Request.find({}).sort({requestCreatedAt : -1});
        if (requestData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : requestData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: requestData
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
router.delete("/deleteRequest", async function (req: any, res: any){
    try {
        // validation 
        if ((!req.query?.requestId || req.query?.requestId == "")) {
            return res.status(400).send({
                message : "Query Id cannot be empty or undefined."
            })
        }
        let requestData = await Request.findOneAndDelete({_id : mongoose.Types.ObjectId.createFromHexString(req.query.requestId)});
        if (requestData) {
                    return res.status(200).send(
                        {
                            message : "Successfully deleted the taskToDo data. ",
                            data : requestData
                        }
                        )
                    
            } else if (requestData == null){
                return res.status(500).send(
                    {
                        message : "TaskToDo with the id of  "+req.query?.requestId+" is already deleted.",
                        data: requestData
                    }
                    )
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: requestData
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