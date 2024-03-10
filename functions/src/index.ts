const functions = require('firebase-functions');
const express = require('express');
const login = require('./controller/login/loginController')


const app = express();
app.use(login);



import {connectDB} from "./dbCoonection";
import { authenticationMiddleware } from './source/middleware/AuthenticationMiddleware';
connectDB();

app.use(authenticationMiddleware);
app.use("/user",require("./source/loginController/loginController"))
app.use("/task",require("./source/taskTodo/TaskTodoController"))





app.get('/', (req: any, res: any) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.send(`
      <!doctype html>
      <head>
        <title>Time</title>
        <link rel="stylesheet" href="/style.css">
        <script src="/script.js"></script>
      </head>
      <body>
        <p>In London, the clock strikes:
          <span id="bongs">${'BONG '.repeat(hours)}</span></p>
        <button onClick="refresh(this)">Refresh</button>
      </body>
    </html>`);
  });

  app.get('/api', async (req: any, res: any) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.json({bongs: 'BONG '.repeat(hours)});
  });
  app.get('/love', (req: any, res: any) => {
    res.json({message: 'I love you. ',task: "I know you are excited to do your tasks now. Go for it. Do the work my love."});
  });
  app.get('/hello', (req: any, res: any) => {
    res.json({message: 'Hello world.',task: "Hi there, now it is time to work on a miracle."});
  });

  exports.app = functions.https.onRequest(app);