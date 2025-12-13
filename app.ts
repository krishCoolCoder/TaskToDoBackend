import express from 'express';
import { connectDB } from './dbCoonection';
import { authenticationMiddleware } from './src/middleware/authentication.middleware';
import userRoutes from './src/modules/user/userRoute';
import authRoutes from './src/modules/auth/authRoute';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication Middleware
app.use(authenticationMiddleware);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

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
