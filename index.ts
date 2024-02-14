// const functions = require('firebase-functions');
// import * as logger from "firebase-functions/logger";
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tasktodouser:tasktodouser@tasktodo.ir517qa.mongodb.net/?retryWrites=true&w=majority";

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      // logger.info("Pinged your deployment. You successfully connected to MongoDB!", {structuredData: true});
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
//   run().catch(console.dir);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const app = express();

app.get('/', (req: any, res: any) => {
    const date = new Date();
    run().catch(console.dir);
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
  app.get('/test', async (req: any, res: any) => {
    // res.json({message: 'Hello world. ',task: "Its time to go ahead with your task."});
    res.json({test : await client.db("admin").command({ ping: 1 })});
  });
  app.get('/love', (req: any, res: any) => {
    res.json({message: 'I love you. ',task: "I know you are excited to do your tasks now. Go for it. Do the work my love."});
  });
  app.get('/hello', (req: any, res: any) => {
    res.json({message: 'Hello world.',task: "Hi there, now it is time to work on a miracle."});
  });

  app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
  })

  // exports.app = functions.https.onRequest(app);

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
