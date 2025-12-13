import express from 'express';
// import { PrismaClient } from '@prisma/client';
// import { headstart } from './startup/headstart'
import {connectDB} from "./dbCoonection"
// import { authorisationMiddleware } from './src/middleware/AuthenticationMiddleware';
const app = express();
const port = 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();