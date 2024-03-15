const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();

let Team = require("../model/Team")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createTeam",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.teamName || req.body.teamName == "")) {
            return res.status(400).send({
                message : "teamName cannot be empty or undefined."
            })
        }
        if ((!req.body.teamStatus || req.body.teamStatus == "")) {
            return res.status(400).send({
                message : "teamStatus cannot be empty or undefined."
            })
        }

        let teamData = await new Team({
            teamId : Math.floor(Math.random() * 9000) + 1000,
            teamName : req.body?.teamName,
            teamDescription : req.body?.teamDescription,
            teamStatus : req.body?.teamStatus,
            teamOrganisationRef : req.body?.teamOrganisationRef,
            teamCreatedBy : req.headers?.currentUser?._id,
            teamCreatedAt : Date.now()
        }).save();
        if (teamData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the teamData data. ",
                            data : teamData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: teamData
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
router.patch("/updateTeam",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }
        if ((!req.body.teamName || req.body.teamName == "")) {
            return res.status(400).send({
                message : "teamName cannot be empty or undefined."
            })
        }
        if ((!req.body.teamStatus || req.body.teamStatus == "")) {
            return res.status(400).send({
                message : "teamStatus cannot be empty or undefined."
            })
        }

        let teamData = await Team.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    teamId : Math.floor(Math.random() * 9000) + 1000,
                    teamName : req.body?.teamName,
                    teamDescription : req.body?.teamDescription,
                    teamStatus : req.body?.teamStatus,
                    teamOrganisationRef : req.body?.teamOrganisationRef,
                    teamUpdatedBy : req.headers?.currentUser?._id,
                    teamUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (teamData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the query data. ",
                            data : teamData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: teamData
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

router.get("/teamList", async function (req: any, res: any){
    try {
        // let teamList = await Team.find({}).sort({teamCreatedAt : -1});
        let query;
        if (req.query.hasOwnProperty("organisationId")){
            query = {
                "teamOrganisationMappings.organisationId":mongoose.Types.ObjectId.createFromHexString(req.query?.organisationId),
                "teamOrganisationMappings.userId" : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id)
            }
        } else {
            return res.status(500).send(
                {
                    message : "orgainsationId query parameter is required."
                }
                )
        }
        let teamList = await Team.aggregate(
            [
                {
                    $match : {}
                },
                {
                    $lookup : {
                        from : "userteammappings",
                        localField : "_id",
                        foreignField: "teamId",
                        as : "teamOrganisationMappings"
                    }
                }, 
                {
                    $match : query
                }
            ]
            );
            // console.log("The query is this : ", query)
            // console.log("The tempData is this : ", teamList)
        if (teamList) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : teamList
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: teamList
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
router.delete("/deleteTeam", async function (req: any, res: any){
    try {
        // validation 
        if ((!req.query?.teamId || req.query?.teamId == "")) {
            return res.status(400).send({
                message : "Query Id cannot be empty or undefined."
            })
        }
        let teamData = await Team.findOneAndDelete({_id : mongoose.Types.ObjectId.createFromHexString(req.query.teamId)});
        if (teamData) {
                    return res.status(200).send(
                        {
                            message : "Successfully deleted the taskToDo data. ",
                            data : teamData
                        }
                        )
                    
            } else if (teamData == null){
                return res.status(500).send(
                    {
                        message : "TaskToDo with the id of  "+req.query?.teamId+" is already deleted.",
                        data: teamData
                    }
                    )
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: teamData
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