import { Router, Request, Response } from 'express';
import { projectService } from './projectService';

const router = Router();

// Create a new project
router.post('/', async (req: Request, res: Response) => {
  try {
    const { projectName, projectDescription, projectTitle, projectHeaderColor, projectSidebarColor, projectStatus } = req.body;

    if (!projectName || !projectDescription) {
      return res.status(400).json({
        success: false,
        message: 'projectName and projectDescription are required'
      });
    }

    // Get current user from header
    let createdById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      createdById = currentUser.userId;
    }

    const result = await projectService.createProject({
      projectName,
      projectDescription,
      projectTitle,
      projectHeaderColor,
      projectSidebarColor,
      projectStatus
    }, createdById);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get all projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await projectService.getAllProjects();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get projects by status
router.get('/status/:status', async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either active or inactive'
      });
    }
    const result = await projectService.getProjectsByStatus(status);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get project by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await projectService.getProjectById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Update project
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.createdAt;
    delete updateData.createdBy;

    // Get current user from header
    let updatedById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      updatedById = currentUser.userId;
    }

    const result = await projectService.updateProject(id, updateData, updatedById);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Delete project
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await projectService.deleteProject(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

export default router;

