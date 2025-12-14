import { Router, Request, Response } from 'express';
import { designationMasterService } from './designationMasterService';

const router = Router();

// Create designation
router.post('/', async (req: Request, res: Response) => {
  try {
    const { designationName } = req.body;

    if (!designationName) {
      return res.status(400).json({
        success: false,
        message: 'designationName is required'
      });
    }

    // Get current user from token
    const currentUser = req.currentUser ? JSON.parse(req.currentUser) : null;
    const createdById = currentUser?.userId;

    const result = await designationMasterService.create({ designationName }, createdById);

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

// Get all designations
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await designationMasterService.getAll();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get designation by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await designationMasterService.getById(id);

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

// Update designation
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.createdAt;
    delete updateData.createdBy;
    delete updateData.updatedAt;

    // Get current user from token
    const currentUser = req.currentUser ? JSON.parse(req.currentUser) : null;
    const updatedById = currentUser?.userId;

    const result = await designationMasterService.update(id, updateData, updatedById);

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

// Delete designation
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await designationMasterService.delete(id);

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

