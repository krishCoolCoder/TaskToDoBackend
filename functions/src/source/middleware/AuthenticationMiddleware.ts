// const express = require('express')
// const app = express()

let {cryptoDecode} = require("../utility/utils")

export function authenticationMiddleware(req: any, res: any, next:any){
  console.log('Time:', Date.now())
  console.log("The current route is this : ", req.path)
  if (req.path !== "/user/login"){
    if (!req.headers.hasOwnProperty("authentication") || req.headers?.authentication == undefined) {
      res.status(400).send(
        {
          message : "User is not recognized."
        }
      )
    }
    console.log("The testing thing : ", cryptoDecode(req.headers?.authentication))
    req.headers['currentUser'] = cryptoDecode(req.headers?.authentication);
  }
  next()
}