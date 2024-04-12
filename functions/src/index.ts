const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());



import {connectDB} from "./dbCoonection";
import { authenticationMiddleware } from './source/middleware/AuthenticationMiddleware';
connectDB();

app.use(authenticationMiddleware);
app.use("/",require("./source/loginController/loginController"))
app.use("/task",require("./source/taskTodo/TaskTodoController"))
app.use("/query",require("./source/query/QueryController"))
app.use("/request",require("./source/request/RequestController"))
app.use("/todo",require("./source/todo/Todo"))
app.use("/user",require("./source/user/UserController"))
app.use("/organisation",require("./source/organisation/OrganisationController"))
app.use("/team",require("./source/team/TeamController"));
app.use("/project",require("./source/project/ProjectController"))





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
  // app.listen(3000, () => {
  //   return console.log(`Express is listening at http://localhost:${3000}`);
  // });