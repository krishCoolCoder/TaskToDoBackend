// const bodyParser = require("body-parser");
import * as bodyParser from "body-parser";
// import {BodyParser} from "body-parser";
// let bodyParser = BodyParser;

var router = require("express").Router();

let UserModel = require("../model/user");
let { cryptoEncode } = require("../utility/utils");

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
    }
    let userData = await UserModel.findOne(
        {
            email : req.body.userMail,
            password : req.body.userPassword
        }
    ).lean();
    userData["tokenCreatedAt"] = Date.now();
    console.log("The userData is this : ", userData, " and the query is this : ",{
        email : req.body.userMail,
        password : req.body.userPassword
    } , " the date now is this : ", Date.now(), " and the req.headers.current user is this : ", req.headers.currentUser);
        if (userData) {
            res.status(200).send(
                {
                    message:"Successfully logged in.",
                    data : userData,
                    token : cryptoEncode(userData)
                }
                )
            } else if (userData === null){} 
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