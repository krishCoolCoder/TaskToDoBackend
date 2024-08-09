const bodyParser = require("body-parser");
// import mongoose from "mongoose";
import { documentValidation } from "../api/chatGptApi";

var router = require("express").Router();
// let TaskToDo = require("../model/TaskToDo")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.post("/documentValidation", async function (req: any, res: any){
    try {
        let response = await documentValidation(
            `
            You are a Technical Analyst and your responsibilities are as listed below : 
1. Reviewing project documentation to identify and verify the mentioned technology stack.
2. Ensuring that all technical requirements and specifications are clearly defined and feasible.
3. Ensuring all necessary technical details are included in the documentation.
4. Ensuring that the tech stack aligns with the overall architecture and design of the project.
Now your job is to let us know what are all the technologies was discussed in the document.
Remeber to respond on json format following the below format and strictly respond in json response.
Respond in the below format 
{
"techAnalysis": [
{
"backendProgrammingLanguage":"", // whatever the programming language provided or if no data provided then just assign "No data provided"
"backendFrameworkOrLibrary":"", // Whatever the framework/library provided or if no data provided then just assign "No data provided"
"database":"", // Whatever the database base technology provided or if no data provided then just assign "No database data provided"
"frontendPorgammingLanguage":"" ,// Whatever the programming language provided or if no data provided then just assign "No data provided"
"frontendFrameworkOrLibrary" :"" // Whatever the framework/library/platform provided or if no data provided then just assign "No data provided"
}
]
}
Do not provide any other data as response, just the expected response should follow the above json format.

Given requirement is : 
We need an insurance management platform for the products like travel, ctpl and motor. I need the users roles to be admin, agent and sales. I need the users should be logging in with an otp and that otp should be sent to users by either email or sms. Users should have an option to chose either sms or emails service for logging it. after logging in user should be greeted with the list of policies and quotation that he has created. Use node js for back end with ts and along with the react js for the front end.The logged user shall create new quotation and share it with link to the customer. If customer updates the status of the quotation to proceed and the logged user shall create policies. Along with the generation of the quotation and policy the mail has to be sent to the customers with the pdf of the quotation and policy. And finally the logged in user can just log out.
            `
        );
        console.log("The response is this : ", response    )
        return res.status(200).send(response);
    } catch (error: any) {
        console.log("The error is this : ", error)
        return res.status(500).send("Something went wrong.")
    }
});
router.post("/taskGeneration", async function (req: any, res: any){
    try {
        let response = await documentValidation(
            `
            You are an enthusiastic Business Analyst and your responsibility involves Gathers and analyzes requirements from the below requirements and Breaks down high-level requirements into detailed tasks and user stories along with the preparation of requirement documents, user stories, and acceptance criteria. You will have to finally create the tasks along with their explanation in a json format. Follow the json format as given below.
{
tasks : [
{
taskTitle : "" // Task title goes here,
taskDescription : "" // Task description goes here
}]

Document is as given below :
We need an insurance management platform for the products like travel, ctpl and motor. I need the users roles to be admin, agent and sales. I need the users should be logging in with an otp and that otp should be sent to users by either email or sms. Users should have an option to chose either sms or emails service for logging it. after logging in user should be greeted with the list of policies and quotation that he has created. The logged user shall create new quotation and share it with link to the customer. If customer updates the status of the quotation to proceed and the logged user shall create policies. Along with the generation of the quotation and policy the mail has to be sent to the customers with the pdf of the quotation and policy. And finally the logged in user can just log out.
`
        );
        console.log("The initial response is this : ", response)
        response = await documentValidation(`
            You are an Technical Lead / Team Lead and your responsibilities are distribution of the tasks among team members based on their skills and workload, Ensuring that tasks are aligned with project priorities and deadlines, Breaking down the project requirements into manageable tasks, defining clear task descriptions and objectives, setting timelines and milesnotes for task completion, writing code and contributing to the development process, Ensuring code is efficient, maintainable and adheres to best practices, Interpreting and understanding the requirements provided by the Business Analysts.
Technology stack : We will use node js, mongoose and express.
Provide the response in the json format following the below format : 
{ 
"tasks" : [
{
"taskTitle": "" // title of the task,
"taskDescription":"" // Description of the task,
"taskCodeSample":"" // Provide the code sample here with simple and concise manner and avoid repetition,
"taskEstimation":"" // Provide the estimated time that should be taken for the task,
}
]
The input provided by the business analyst as a json format is given below : 
${response}
            `)
        console.log("The response is this : ", response    )
        return res.status(200).send(response);
    } catch (error: any) {
        console.log("The error is this : ", error)
        return res.status(500).send("Something went wrong.")
    }
});

module.exports = router;