const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();
let TaskToDo = require("../model/TaskToDo")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createTask",async function (req : any, res: any){
    try {
        console.log("Into the controller ",req.body)

        // validation 
        if ((!req.body.taskTitle || req.body.taskTitle == "")) {
            return res.status(400).send({
                message : "Task title cannot be empty or undefined."
            })
        }
        if ((!req.body.taskStatus || req.body.taskStatus == "")) {
            return res.status(400).send({
                message : "Task title cannot be empty or undefined."
            })
        }
        console.log("The paylaod is this : ", req.body)
        let taskToDoData = await new TaskToDo({
            taskNo : Math.floor(Math.random() * 9000) + 1000,
            taskTitle : req.body?.taskTitle,
            taskDescription : req.body?.taskDescription,
            taskStatus : req.body.taskStatus,
            taskProgress : req.body?.taskProgress,
            taskAssignedTo : req.body?.taskAssignedTo,
            teamRef : req.body?.teamRef,
            organisationRef : req.body?.organisationRef,
            projectRef : req.body?.projectRef,
            taskCreatedBy : req.headers?.currentUser?._id,
            taskCreatedAt : Date.now()
        }).save();
        if (taskToDoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : taskToDoData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: taskToDoData
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
router.patch("/updateTask",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }
        if ((!req.body.taskTitle || req.body.taskTitle == "")) {
            return res.status(400).send({
                message : "Task title cannot be empty or undefined."
            })
        }
        if ((!req.body.taskStatus || req.body.taskStatus == "")) {
            return res.status(400).send({
                message : "Task title cannot be empty or undefined."
            })
        }

        let taskToDoData = await TaskToDo.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    taskNo : Math.floor(Math.random() * 9000) + 1000,
                    taskTitle : req.body?.taskTitle,
                    taskDescription : req.body?.taskDescription,
                    taskStatus : req.body.taskStatus,
                    taskProgress : req.body?.taskProgress,
                    taskAssignedTo : req.body?.taskAssignedTo,
                    teamRef : req.body?.teamRef,
                    organisationRef : req.body?.organisationRef,
                    projectRef : req.body?.projectRef,
                    taskUpdatedBy : req.headers?.currentUser?._id,
                    taskUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (taskToDoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : taskToDoData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: taskToDoData
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
router.patch("/updateTaskStatus",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }
        if ((!req.body.taskStatus || req.body.taskStatus == "")) {
            return res.status(400).send({
                message : "Task status cannot be empty or undefined."
            })
        }

        let taskToDoData = await TaskToDo.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    taskNo : Math.floor(Math.random() * 9000) + 1000,
                    taskTitle : req.body?.taskTitle,
                    taskDescription : req.body?.taskDescription,
                    taskStatus : req.body.taskStatus,
                    taskProgress : req.body?.taskProgress,
                    taskAssignedTo : req.body?.taskAssignedTo,
                    teamRef : req.body?.teamRef,
                    organisationRef : req.body?.organisationRef,
                    taskUpdatedBy : req.headers?.currentUser?._id,
                    taskUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (taskToDoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : taskToDoData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: taskToDoData
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
router.patch("/assignTask",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id property cannot be empty or undefined."
            })
        }
        if ((!req.body.assignTo || req.body.assignTo == "")) {
            return res.status(400).send({
                message : "assignTo property cannot be empty or undefined."
            })
        }

        let taskToDoData = await TaskToDo.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    taskAssignedTo : req.body?.assignTo,
                    taskUpdatedBy : req.headers?.currentUser?._id,
                    taskUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (taskToDoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : taskToDoData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: taskToDoData
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

router.get("/taskList", async function (req: any, res: any){
    try {
        console.log("The query data is this : ",req.query);
        let filter : any = {};
        if ( Object.keys(req.query).length > 0){
            if ( req.query.hasOwnProperty("projectId")){
                        filter["projectRef"] = mongoose.Types.ObjectId.createFromHexString(req.query.projectId)
            } 
            if (req.query.hasOwnProperty("teamId")){
                        filter["teamRef"] = mongoose.Types.ObjectId.createFromHexString(req.query.teamId)
            }
            if (req.query.hasOwnProperty("organisationId")){
                        filter["organisationRef"] = mongoose.Types.ObjectId.createFromHexString(req.query.organisationId)
            }
        }
        console.log("The filter is this : ", {
            ...filter,
            taskCreatedBy : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id)
        })
        let taskToDoData = await TaskToDo.aggregate(
            [
                {
                    $match: 
                    {
                        ...filter,
                        taskCreatedBy : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id)
                    }
                },
                {
                    $lookup : {
                        from : "queries",
                        localField : "_id",
                        foreignField: "taskQueryRef",
                        as : "queries"
                    }
                }, 
                {
                    $lookup : {
                        from : "users",
                        localField : "taskCreatedBy",
                        foreignField : "_id",
                        as : "createdByUser"
                    }
                },
                {
                    $addFields: {
                        taskCreatedBy: { $arrayElemAt: ["$createdByUser", 0] } // Replace taskCreatedBy with the embedded createdByUser object
                    }
                },
                {
                    $lookup : {
                        from : "users",
                        localField : "taskAssignedTo",
                        foreignField : "_id",
                        as : "taskAssignedTo"
                    }
                },
                {
                    $addFields: {
                        taskAssignedTo: { $arrayElemAt: ["$taskAssignedTo", 0] } // Replace taskCreatedBy with the embedded createdByUser object
                    }
                },
                {
                    $project: {
                        createdByUser: 0 // Exclude the createdByUser field from the output
                    }
                }
            ]
        );
        // let taskToDoData = await TaskToDo.find({}).sort({taskCreatedAt : -1});
        if (taskToDoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : taskToDoData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: taskToDoData
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
router.delete("/deleteTask", async function (req: any, res: any){
    try {
        // validation 
        if ((!req.query?.taskId || req.query?.taskId == "")) {
            return res.status(400).send({
                message : "Task Id cannot be empty or undefined."
            })
        }
        let taskToDoData = await TaskToDo.findOneAndDelete({_id : mongoose.Types.ObjectId.createFromHexString(req.query.taskId)});
        if (taskToDoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully deleted the taskToDo data. ",
                            data : taskToDoData
                        }
                        )
                    
            } else if (taskToDoData == null){
                return res.status(500).send(
                    {
                        message : "TaskToDo with the id of  "+req.query?.taskId+"is already deleted.",
                        data: taskToDoData
                    }
                    )
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: taskToDoData
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