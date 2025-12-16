import { Router, Request, Response } from 'express';
import { taskService } from './taskService';

const router = Router();

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { 
      taskTitle, 
      taskDescription, 
      taskStatus, 
      assignedTo, 
      priority,
      startTime,
      dueTime,
      completedAt,
      estimatedTime,
      actualTime,
      taskType,
      taskCategory,
      taskTags,
      progress,
      isArchived
    } = req.body;

    if (!taskTitle || !taskDescription || !taskStatus || !priority) {
      return res.status(400).json({
        success: false,
        message: 'taskTitle, taskDescription, taskStatus, and priority are required'
      });
    }

    // Get current user from header
    let createdById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      createdById = currentUser.userId;
    }

    const result = await taskService.createTask({
      taskTitle,
      taskDescription,
      taskStatus,
      assignedTo,
      priority,
      startTime,
      dueTime,
      completedAt,
      estimatedTime,
      actualTime,
      taskType,
      taskCategory,
      taskTags,
      progress,
      isArchived
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

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await taskService.getAllTasks();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get tasks by status
router.get('/status/:status', async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const result = await taskService.getTasksByStatus(status);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get tasks by priority
router.get('/priority/:priority', async (req: Request, res: Response) => {
  try {
    const { priority } = req.params;
    const result = await taskService.getTasksByPriority(priority);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get tasks assigned to a user
router.get('/assigned/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await taskService.getTasksByAssignedTo(userId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get archived/unarchived tasks
router.get('/archived/:isArchived', async (req: Request, res: Response) => {
  try {
    const { isArchived } = req.params;
    const archived = isArchived === 'true';
    const result = await taskService.getArchivedTasks(archived);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get task by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await taskService.getTaskById(id);

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

// Update task
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

    const result = await taskService.updateTask(id, updateData, updatedById);

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

// Archive task
router.put('/:id/archive', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get current user from header
    let updatedById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      updatedById = currentUser.userId;
    }

    const result = await taskService.archiveTask(id, updatedById);

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

// Unarchive task
router.put('/:id/unarchive', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get current user from header
    let updatedById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      updatedById = currentUser.userId;
    }

    const result = await taskService.unarchiveTask(id, updatedById);

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

// Delete task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await taskService.deleteTask(id);

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

