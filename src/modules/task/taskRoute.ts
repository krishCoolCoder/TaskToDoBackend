import { Router, Request, Response } from 'express';
import { taskService } from './taskService';
import { taskCommentService } from './taskCommentService';
import { taskAttachmentService } from './taskAttachmentService';

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

// =====================================================
// TASK COMMENT ROUTES
// =====================================================

// Create a new comment for a task
router.post('/:taskId/comments', async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { taskComment, commentStatus } = req.body;

    if (!taskComment) {
      return res.status(400).json({
        success: false,
        message: 'taskComment is required'
      });
    }

    // Get current user from header
    let createdById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      createdById = currentUser.userId;
    }

    const result = await taskCommentService.createComment({
      taskRefId: taskId,
      taskComment,
      commentStatus
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

// Get all comments for a task
router.get('/:taskId/comments', async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const result = await taskCommentService.getCommentsByTaskId(taskId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get a specific comment by ID
router.get('/:taskId/comments/:commentId', async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await taskCommentService.getCommentById(commentId);

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

// Update a comment
router.put('/:taskId/comments/:commentId', async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { taskComment, commentStatus } = req.body;

    // Get current user from header
    let updatedById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      updatedById = currentUser.userId;
    }

    const result = await taskCommentService.updateComment(commentId, {
      taskComment,
      commentStatus
    }, updatedById);

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

// Delete a comment
router.delete('/:taskId/comments/:commentId', async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await taskCommentService.deleteComment(commentId);

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

// =====================================================
// TASK ATTACHMENT ROUTES
// =====================================================

// Create a new attachment for a task
router.post('/:taskId/attachments', async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { attachment } = req.body;

    if (!attachment) {
      return res.status(400).json({
        success: false,
        message: 'attachment is required'
      });
    }

    // Get current user from header
    let createdById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      createdById = currentUser.userId;
    }

    const result = await taskAttachmentService.createAttachment({
      taskRefId: taskId,
      attachment
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

// Get all attachments for a task
router.get('/:taskId/attachments', async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const result = await taskAttachmentService.getAttachmentsByTaskId(taskId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get a specific attachment by ID
router.get('/:taskId/attachments/:attachmentId', async (req: Request, res: Response) => {
  try {
    const { attachmentId } = req.params;
    const result = await taskAttachmentService.getAttachmentById(attachmentId);

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

// Update an attachment
router.put('/:taskId/attachments/:attachmentId', async (req: Request, res: Response) => {
  try {
    const { attachmentId } = req.params;
    const { attachment } = req.body;

    // Get current user from header
    let updatedById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      updatedById = currentUser.userId;
    }

    const result = await taskAttachmentService.updateAttachment(attachmentId, {
      attachment
    }, updatedById);

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

// Delete an attachment
router.delete('/:taskId/attachments/:attachmentId', async (req: Request, res: Response) => {
  try {
    const { attachmentId } = req.params;
    const result = await taskAttachmentService.deleteAttachment(attachmentId);

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

