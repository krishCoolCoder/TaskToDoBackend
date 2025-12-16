import express from 'express';
import { connectDB } from './dbCoonection';
import { authenticationMiddleware } from './src/middleware/authentication.middleware';
import userRoutes from './src/modules/user/userRoute';
import authRoutes from './src/modules/auth/authRoute';
import designationMasterRoutes from './src/modules/designationMaster/designationMasterRoute';
import userDesignationMappingRoutes from './src/modules/userDesignationMapping/userDesignationMappingRoute';
import roleMasterRoutes from './src/modules/roleMaster/roleMasterRoute';
import userRoleMappingRoutes from './src/modules/userRoleMapping/userRoleMappingRoute';
import projectRoutes from './src/modules/project/projectRoute';
import userProjectMappingRoutes from './src/modules/userProjectMapping/userProjectMappingRoute';
import taskRoutes from './src/modules/task/taskRoute';
import globalSettingRoutes from './src/modules/globalSetting/globalSettingRoute';

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
app.use('/api/designations', designationMasterRoutes);
app.use('/api/user-designation-mappings', userDesignationMappingRoutes);
app.use('/api/roles', roleMasterRoutes);
app.use('/api/user-role-mappings', userRoleMappingRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/user-project-mappings', userProjectMappingRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/global-settings', globalSettingRoutes);

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
