const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();

let Organisation = require("../model/Organisation")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createOrganisation",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.organisationName || req.body.organisationName == "")) {
            return res.status(400).send({
                message : "organisationName cannot be empty or undefined."
            })
        }
        if ((!req.body.organisationType || req.body.organisationType == "")) {
            return res.status(400).send({
                message : "organisationType cannot be empty or undefined."
            })
        }

        let organisationData = await new Organisation({
            organisationId : Math.floor(Math.random() * 9000) + 1000,
            organisationName : req.body?.organisationName,
            organisationDescription : req.body?.organisationDescription,
            organisationType : req.body?.organisationType,
            organisationCreatedBy : req.headers?.currentUser?._id,
            organisationCreatedAt : Date.now()
        }).save();
        if (organisationData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the organisationData data. ",
                            data : organisationData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: organisationData
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
router.patch("/updateOrganisation",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }
        if ((!req.body.organisationName || req.body.organisationName == "")) {
            return res.status(400).send({
                message : "organisationName cannot be empty or undefined."
            })
        }
        if ((!req.body.organisationType || req.body.organisationType == "")) {
            return res.status(400).send({
                message : "organisationType cannot be empty or undefined."
            })
        }

        let organisationData = await Organisation.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    organisationId : Math.floor(Math.random() * 9000) + 1000,
                    organisationName : req.body?.organisationName,
                    organisationDescription : req.body?.organisationDescription,
                    organisationType : req.body?.organisationType,
                    organisationUpdatedBy : req.headers?.currentUser?._id,
                    organisationUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (organisationData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the query data. ",
                            data : organisationData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: organisationData
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

router.get("/organisationList", async function (req: any, res: any){
    try {
        let organisationList = await Organisation.find({}).sort({organisationCreatedAt : -1});
        if (organisationList) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : organisationList
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: organisationList
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
router.delete("/deleteOrganisation", async function (req: any, res: any){
    try {
        // validation 
        if ((!req.query?.organisationId || req.query?.organisationId == "")) {
            return res.status(400).send({
                message : "Query Id cannot be empty or undefined."
            })
        }
        let organisationData = await Organisation.findOneAndDelete({_id : mongoose.Types.ObjectId.createFromHexString(req.query.organisationId)});
        if (organisationData) {
                    return res.status(200).send(
                        {
                            message : "Successfully deleted the taskToDo data. ",
                            data : organisationData
                        }
                        )
                    
            } else if (organisationData == null){
                return res.status(500).send(
                    {
                        message : "TaskToDo with the id of  "+req.query?.userId+" is already deleted.",
                        data: organisationData
                    }
                    )
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: organisationData
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