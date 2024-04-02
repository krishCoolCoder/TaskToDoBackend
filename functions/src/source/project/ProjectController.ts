const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();

let Project = require("../model/Project")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createProject",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.projectName || req.body.projectName == "")) {
            return res.status(400).send({
                message : "Project title cannot be empty or undefined."
            })
        };

        let projectData = await new Project({
            projectId : Math.floor(Math.random() * 9000) + 1000,
            projectName : req.body?.projectName,
            projectDescription : req.body?.projectDescription,
            projectStatus : req.body?.projectStatus,
            projectCreatedBy : req.headers?.currentUser?._id,
            projectCreatedAt : Date.now()
        }).save();
        if (projectData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the projectData data. ",
                            data : projectData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: projectData
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
});

router.patch("/updateProject",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }

        let projectData = await Project.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    projectName : req.body?.projectName,
                    projectDescription : req.body?.projectDescription,
                    projectStatus : req.body?.projectStatus,
                    projectUpdatedBy : req.headers?.currentUser?._id,
                    projectUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (projectData) {
                    return res.status(200).send(
                        {
                            message : "Successfully updated the Project data. ",
                            data : projectData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: projectData
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

router.get("/projectList", async function (req: any, res: any){
    try {
        let projectData = await Project.find({}).sort({projectCreatedAt : -1});
        if (projectData) {
                    return res.status(200).send(
                        {
                            message : "Successfully received the project list data. ",
                            data : projectData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: projectData
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
router.delete("/deleteProject", async function (req: any, res: any){
    try {
        // validation 
        if ((!req.query?.projectId || req.query?.projectId == "")) {
            return res.status(400).send({
                message : "Project Id cannot be empty or undefined."
            })
        }
        let projectData = await Project.findOneAndDelete({_id : mongoose.Types.ObjectId.createFromHexString(req.query.projectId)});
        if (projectData) {
                    return res.status(200).send(
                        {
                            message : "Successfully deleted the project data. ",
                            data : projectData
                        }
                        )
                    
            } else if (projectData == null){
                return res.status(500).send(
                    {
                        message : "TaskToDo with the id of  "+req.query?.projectId+" is already deleted.",
                        data: projectData
                    }
                    )
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: projectData
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