import { Router, Request, Response } from 'express';
import { userRoleMappingService } from './userRoleMappingService';

const router = Router();

// Create a new user role mapping
router.post('/', async (req: Request, res: Response) => {
  try {
    const { roleRefId, userRefId } = req.body;

    if (!roleRefId || !userRefId) {
      return res.status(400).json({
        success: false,
        message: 'roleRefId and userRefId are required'
      });
    }

    // Get current user from header
    let createdById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      createdById = currentUser.userId;
    }

    const result = await userRoleMappingService.createMapping({ roleRefId, userRefId }, createdById);

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

// Get all user role mappings
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await userRoleMappingService.getAllMappings();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get user role mapping by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userRoleMappingService.getMappingById(id);

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

// Get mappings by user ID
router.get('/user/:userRefId', async (req: Request, res: Response) => {
  try {
    const { userRefId } = req.params;
    const result = await userRoleMappingService.getMappingsByUserId(userRefId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get mappings by role ID
router.get('/role/:roleRefId', async (req: Request, res: Response) => {
  try {
    const { roleRefId } = req.params;
    const result = await userRoleMappingService.getMappingsByRoleId(roleRefId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Update user role mapping
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { roleRefId, userRefId } = req.body;

    // Get current user from header
    let updatedById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      updatedById = currentUser.userId;
    }

    const result = await userRoleMappingService.updateMapping(id, { roleRefId, userRefId }, updatedById);

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

// Delete user role mapping
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userRoleMappingService.deleteMapping(id);

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

