import { Router, Request, Response } from 'express';
import { globalSettingService } from './globalSettingService';

const router = Router();

// Create a new global setting
router.post('/', async (req: Request, res: Response) => {
  try {
    const { 
      applicationStatus,
      scheduledTime,
      maintenanceMessage,
      maintenanceDuration,
      maxTasksPerUser,
      maxCommentPerTask,
      maxAttachmentsPerTask,
      maxAttachmentSizeMB,
      maxProjectPerUser
    } = req.body;

    // Get current user from header
    let createdById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      createdById = currentUser.userId;
    }

    const result = await globalSettingService.createSetting({
      applicationStatus,
      scheduledTime,
      maintenanceMessage,
      maintenanceDuration,
      maxTasksPerUser,
      maxCommentPerTask,
      maxAttachmentsPerTask,
      maxAttachmentSizeMB,
      maxProjectPerUser
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

// Get all global settings
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await globalSettingService.getAllSettings();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get latest global setting
router.get('/latest', async (req: Request, res: Response) => {
  try {
    const result = await globalSettingService.getLatestSetting();

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

// Get application status (public endpoint for checking maintenance)
router.get('/status', async (req: Request, res: Response) => {
  try {
    const result = await globalSettingService.getApplicationStatus();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get global setting by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await globalSettingService.getSettingById(id);

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

// Update global setting
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

    const result = await globalSettingService.updateSetting(id, updateData, updatedById);

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

// Delete global setting
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await globalSettingService.deleteSetting(id);

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

