const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();
let TaskToDo = require("../model/TaskToDo")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createTask",async function (req : any, res: any){
    try {

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

        let taskToDoData = await new TaskToDo({
            taskNo : Math.floor(Math.random() * 9000) + 1000,
            taskTitle : req.body?.taskTitle,
            taskDescription : req.body?.taskDescription,
            taskStatus : req.body.taskStatus,
            taskProgress : req.body?.taskProgress,
            teamRef : req.body?.teamRef || 1,
            organisationRef : req.body?.organisationRef || 1,
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
                    teamRef : req.body?.teamRef || 1,
                    organisationRef : req.body?.organisationRef || 1,
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
                    teamRef : req.body?.teamRef || 1,
                    organisationRef : req.body?.organisationRef || 1,
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
        let taskToDoData = await TaskToDo.find({}).sort({taskCreatedAt : -1});
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