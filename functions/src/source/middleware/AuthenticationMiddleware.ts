// const express = require('express')
// const app = express()

let {cryptoDecode} = require("../utility/utils")

export function authenticationMiddleware(req: any, res: any, next:any){
  console.log('Time:', Date.now())
  console.log("The current route is this : ", req.path, " and the req.method is this : ", req.method, " and the req.body is this : ", req.body)
  if (req.path !== "/login"){
    if (!req.headers.hasOwnProperty("authentication") || req.headers?.authentication == undefined) {
      res.status(400).send(
        {
          message : "User is not recognized.",
          path : req.method,
          body : req.body
        }
      )
    }
    console.log("The testing thing : ", cryptoDecode(req.headers?.authentication))
    req.headers['currentUser'] = cryptoDecode(req.headers?.authentication)[0];
  }
  console.log("Log before the next()")
  next()
  console.log("Log after the next()")
}