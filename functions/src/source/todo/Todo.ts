const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();

let Todo = require("../model/ToDo")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createTodo",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.todoData || req.body.todoData == "")) {
            return res.status(400).send({
                message : "Todo data cannot be empty or undefined."
            })
        }
        // if ((!req.body.todoTeamRef || req.body.todoTeamRef == "")) {
        //     return res.status(400).send({
        //         message : "Todo team reference cannot be empty or undefined."
        //     })
        // }
        // if ((!req.body.todoOrganisationRef || req.body.todoOrganisationRef == "")) {
        //     return res.status(400).send({
        //         message : "Todo organisation reference cannot be empty or undefined."
        //     })
        // }
        console.log("The payload is this : ",{
            todoCode : Math.floor(Math.random() * 9000) + 1000,
            todoData : req.body?.todoData,
            todoProjectRef : req.body?.todoProjectRef,
            todoTeamRef : req.body?.todoTeamRef,
            todoOrganisationRef : req.body.todoOrganisationRef,
            todoCreatedBy : req.headers?.currentUser?._id,
            todoCreatedAt : Date.now()
        })
        let todoData = await new Todo({
            todoCode : Math.floor(Math.random() * 9000) + 1000,
            todoData : req.body?.todoData,
            todoProjectRef : req.body?.todoProjectRef,
            todoTeamRef : req.body?.todoTeamRef,
            todoOrganisationRef : req.body.todoOrganisationRef,
            todoCreatedBy : req.headers?.currentUser?._id,
            todoCreatedAt : Date.now()
        }).save();
        if (todoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the todoData data. ",
                            data : todoData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: todoData
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
router.patch("/updateTodo",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }
        if ((!req.body.todoData || req.body.todoData == "")) {
            return res.status(400).send({
                message : "Todo data cannot be empty or undefined."
            })
        }
        // if ((!req.body.todoTeamRef || req.body.todoTeamRef == "")) {
        //     return res.status(400).send({
        //         message : "Todo team reference cannot be empty or undefined."
        //     })
        // }
        // if ((!req.body.todoOrganisationRef || req.body.todoOrganisationRef == "")) {
        //     return res.status(400).send({
        //         message : "Todo organisation reference cannot be empty or undefined."
        //     })
        // }

        let todoData = await Todo.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    todoCode : Math.floor(Math.random() * 9000) + 1000,
                    todoData : req.body?.todoData,
                    todoProjectRef : req.body?.todoProjectRef,
                    todoTeamRef : req.body?.todoTeamRef,
                    todoOrganisationRef : req.body.todoOrganisationRef,
                    todoCreatedBy : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id),
                    todoCreatedAt : Date.now(),
                    todoUpdatedBy : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id),
                    requestUpdattodoUpdatedAtedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (todoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the query data. ",
                            data : todoData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: todoData
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

router.get("/todoList", async function (req: any, res: any){
    try {
        // let todoList = await Todo.find({todoCreatedBy : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id)}).sort({todoCreatedAt : -1});
        let filter : any = {};
        if ( Object.keys(req.query).length > 0){
            if ( req.query.hasOwnProperty("projectId")){
                        filter["todoProjectRef"] = mongoose.Types.ObjectId.createFromHexString(req.query.projectId)
            } 
            if (req.query.hasOwnProperty("teamId")){
                        filter["todoTeamRef"] = mongoose.Types.ObjectId.createFromHexString(req.query.teamId)
            }
            if (req.query.hasOwnProperty("organisationId")){
                        filter["todoOrganisationRef"] = mongoose.Types.ObjectId.createFromHexString(req.query.organisationId)
            }
        }
        console.log("The filter is this : ", {
            ...filter,
            taskCreatedBy : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id)
        })
        let todoList = await Todo.aggregate(
            [
                {
                    $match: 
                    {
                        ...filter,
                        todoCreatedBy : mongoose.Types.ObjectId.createFromHexString(req.headers?.currentUser?._id)
                    }
                }
            ]
        )
        if (todoList) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : todoList
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: todoList
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
router.delete("/deleteTodo", async function (req: any, res: any){
    try {
        // validation 
        if ((!req.query?.todoId || req.query?.todoId == "")) {
            return res.status(400).send({
                message : "Query Id cannot be empty or undefined."
            })
        }
        let todoData = await Todo.findOneAndDelete({_id : mongoose.Types.ObjectId.createFromHexString(req.query.todoId)});
        if (todoData) {
                    return res.status(200).send(
                        {
                            message : "Successfully deleted the taskToDo data. ",
                            data : todoData
                        }
                        )
                    
            } else if (todoData == null){
                return res.status(500).send(
                    {
                        message : "TaskToDo with the id of  "+req.query?.todoId+" is already deleted.",
                        data: todoData
                    }
                    )
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: todoData
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