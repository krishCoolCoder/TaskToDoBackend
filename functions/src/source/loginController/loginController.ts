// const bodyParser = require("body-parser");
import * as bodyParser from "body-parser";
// import {BodyParser} from "body-parser";
// let bodyParser = BodyParser;

var router = require("express").Router();

let { cryptoEncode } = require("../utility/utils");
let UserModel = require("../model/user");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/login", async function (req: any, res: any) {
    if (!req.body.userMail || !req.body.userPassword ) {
        res.status(400).send(
            {
                message : "Invalid or missing parameters for login operation."
            }
        )
    };

    let userData = await UserModel.aggregate([
        {
          $match: {
            email: req.body.userMail,
            password: req.body.userPassword
          }
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
      ]).exec();
      
    console.log("The userData is this : ", userData, " and the query is this : ",{
        email : req.body.userMail,
        password : req.body.userPassword
    } , " the date now is this : ", Date.now(), " and the req.headers.current user is this : ", req.headers.currentUser);
    console.log("The actual code is this : ",cryptoEncode(userData))
    if (userData.length !== 0) {
        userData["tokenCreatedAt"] = Date.now();
        res.status(200).send(
            {
                message:"Successfully logged in.",
                data : userData,
                token : String(cryptoEncode(userData))
            }
            )
        } else if (userData === null){
        res.status(500).send(
                {
                    message: "User does is not recognised"
                }
            )
        } else if (userData?.length == 0){
        res.status(500).send(
                {
                    message: "User does is not recognised"
                }
            )
        }
        else  {
            res.status(500).send(
                {
                    message: "Something went wrong, We have reported the issue."
                }
            )
        }
});

router.get("/get", async function (req : any, res: any) {
    res.status(200).send({data:"Success"})
});

module.exports = router;