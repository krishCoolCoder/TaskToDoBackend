import { Router, Request, Response } from 'express';
import { userDesignationMappingService } from './userDesignationMappingService';

const router = Router();

// Create mapping
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, designationId } = req.body;

    if (!userId || !designationId) {
      return res.status(400).json({
        success: false,
        message: 'userId and designationId are required'
      });
    }

    // Get current user from token
    const currentUser = req.currentUser ? JSON.parse(req.currentUser) : null;
    const createdById = currentUser?.userId;

    const result = await userDesignationMappingService.create({ userId, designationId }, createdById);

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

// Get all mappings
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await userDesignationMappingService.getAll();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get mappings by user ID
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userDesignationMappingService.getByUserId(userId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get mappings by designation ID
router.get('/designation/:designationId', async (req: Request, res: Response) => {
  try {
    const { designationId } = req.params;
    const result = await userDesignationMappingService.getByDesignationId(designationId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get mapping by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userDesignationMappingService.getById(id);

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

// Update mapping
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, designationId } = req.body;

    // Get current user from token
    const currentUser = req.currentUser ? JSON.parse(req.currentUser) : null;
    const updatedById = currentUser?.userId;

    const result = await userDesignationMappingService.update(id, { userId, designationId }, updatedById);

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

// Delete mapping
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userDesignationMappingService.delete(id);

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


