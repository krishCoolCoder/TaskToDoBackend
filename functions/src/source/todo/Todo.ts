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
        if ((!req.body.todoTeamRef || req.body.todoTeamRef == "")) {
            return res.status(400).send({
                message : "Todo team reference cannot be empty or undefined."
            })
        }
        if ((!req.body.todoOrganisationRef || req.body.todoOrganisationRef == "")) {
            return res.status(400).send({
                message : "Todo organisation reference cannot be empty or undefined."
            })
        }

        let todoData = await new Todo({
            todoCode : Math.floor(Math.random() * 9000) + 1000,
            todoData : req.body?.todoData,
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
        if ((!req.body.todoTeamRef || req.body.todoTeamRef == "")) {
            return res.status(400).send({
                message : "Todo team reference cannot be empty or undefined."
            })
        }
        if ((!req.body.todoOrganisationRef || req.body.todoOrganisationRef == "")) {
            return res.status(400).send({
                message : "Todo organisation reference cannot be empty or undefined."
            })
        }

        let todoData = await Todo.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    todoCode : Math.floor(Math.random() * 9000) + 1000,
                    todoData : req.body?.todoData,
                    todoTeamRef : req.body?.todoTeamRef,
                    todoOrganisationRef : req.body.todoOrganisationRef,
                    todoCreatedBy : req.headers?.currentUser?.userId,
                    todoCreatedAt : Date.now(),
                    todoUpdatedBy : req.headers?.currentUser?._id,
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
        let todoList = await Todo.find({}).sort({todoCreatedAt : -1});
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