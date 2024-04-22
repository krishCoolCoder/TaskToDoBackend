const bodyParser = require("body-parser");
import mongoose from "mongoose";

var router = require("express").Router();

let User = require("../model/user")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/createUser",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.userName || req.body.userName == "")) {
            return res.status(400).send({
                message : "userName cannot be empty or undefined."
            })
        }
        if ((!req.body.firstName || req.body.firstName == "")) {
            return res.status(400).send({
                message : "firstName cannot be empty or undefined."
            })
        }
        if ((!req.body.email || req.body.email == "")) {
            return res.status(400).send({
                message : "Email cannot be empty or undefined."
            })
        }
        if ((!req.body.password || req.body.password == "")) {
            return res.status(400).send({
                message : "Password cannot be empty or undefined."
            })
        }

        let userData = await new User({
            userId : Math.floor(Math.random() * 9000) + 1000,
            userName : req.body?.userName,
            firstName : req.body?.firstName,
            lastName : req.body?.lastName,
            email : req.body?.email,
            password : req.body.password,
            userTeamRef : req.body?.userTeamRef ,
            userOrganisationRef : req.body?.userOrganisationRef ,
            userCreatedBy : req.headers?.currentUser?._id,
            userCreatedAt : Date.now()
        }).save();
        if (userData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the userData data. ",
                            data : userData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: userData
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
router.patch("/updateUser",async function (req : any, res: any){
    try {

        // validation 
        if ((!req.body.id || req.body.id == "")) {
            return res.status(400).send({
                message : "id cannot be empty or undefined."
            })
        }
        if ((!req.body.userName || req.body.userName == "")) {
            return res.status(400).send({
                message : "userName cannot be empty or undefined."
            })
        }
        if ((!req.body.firstName || req.body.firstName == "")) {
            return res.status(400).send({
                message : "firstName cannot be empty or undefined."
            })
        }
        if ((!req.body.email || req.body.email == "")) {
            return res.status(400).send({
                message : "Email cannot be empty or undefined."
            })
        }
        if ((!req.body.password || req.body.password == "")) {
            return res.status(400).send({
                message : "Password cannot be empty or undefined."
            })
        }

        let userData = await User.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId.createFromHexString(req.body.id)},
            {$set :
                {
                    userId : Math.floor(Math.random() * 9000) + 1000,
                    userName : req.body?.userName,
                    firstName : req.body?.firstName,
                    lastName : req.body?.lastName,
                    email : req.body?.email,
                    password : req.body.password,
                    userTeamRef : req.body?.userTeamRef,
                    userOrganisationRef : req.body?.userOrganisationRef,
                    userUpdatedBy : req.headers?.currentUser?._id,
                    userUpdatedAt : Date.now()
                }
        },
        {
            new : true
        });
        if (userData) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the query data. ",
                            data : userData
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: userData
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

router.get("/userList", async function (req: any, res: any){
    try {
        console.log("The current user is this : ", req.headers.currentUser);
        // req.headers.currentUser.userRoles.filter((data: any)=> {
        //     return data = "SuperAdmin"
        // })
        let filter : any = {};
        let roles = req.headers.currentUser.userRoles.map((obj : any) => obj.roleName).join(',');
        console.log("The roles are : ", roles);
        if ( roles.includes("SuperAdmin")){
            // filter["userRoles.roleName"] = "SuperAdmin";
            filter = {}
        } else if ( roles.includes("Admin")) {
            // filter["userRoles.roleName"] = "Admin";
            filter = {
                $or : [
                    {"userRoles.roleName" : "Admin"}
                ]
            }
        } else if ( roles.includes("User")) {
            // filter["userRoles.roleName"] = "User";
            filter = {
                $or : [
                    {"userRoles.roleName" : "User"}
                ]
            }
        }
        console.log("The filter is this : ", filter);
        let userList = await User.aggregate(
            [
                {
                    $match : {}
                },
                {
                    $lookup: {
                      from: "userrolemappings",
                      localField: "_id",
                      foreignField: "userId",
                      as: "userRoleMappings"
                    }
                },
                {
                    $lookup: {
                      from: "userroles",
                      localField: "userRoleMappings.roleId",
                      foreignField: "_id",
                      as: "userRoles"
                    }
                },
                {
                    $match : filter
                },
                {
                    $project : {
                        _id: 1,
                        userId : 1,
                        userName : 1,
                        firstName : 1,
                        lastName : 1,
                        email : 1,
                        userCreatedBy : 1,
                        userCreatedAt : 1,
                        userUpdatedBy : 1,
                        userUpdatedAt : 1,
                        userRoleMappings : 1,
                        userRoles: 1
                    }
                }
            ]
        )
        if (userList) {
                    return res.status(200).send(
                        {
                            message : "Successfully saved the taskToDo data. ",
                            data : userList
                        }
                        )
                    
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: userList
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
router.delete("/deleteUser", async function (req: any, res: any){
    try {
        // validation 
        if ((!req.query?.userId || req.query?.userId == "")) {
            return res.status(400).send({
                message : "Query Id cannot be empty or undefined."
            })
        }
        let userData = await User.findOneAndDelete({_id : mongoose.Types.ObjectId.createFromHexString(req.query.userId)});
        if (userData) {
                    return res.status(200).send(
                        {
                            message : "Successfully deleted the taskToDo data. ",
                            data : userData
                        }
                        )
                    
            } else if (userData == null){
                return res.status(500).send(
                    {
                        message : "TaskToDo with the id of  "+req.query?.userId+" is already deleted.",
                        data: userData
                    }
                    )
            } else {
                return res.status(500).send(
                    {
                        message : "Something went wrong and reported it.",
                        data: userData
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