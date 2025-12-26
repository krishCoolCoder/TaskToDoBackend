import { Router, Request, Response } from 'express';
import { userProjectMappingService } from './userProjectMappingService';

const router = Router();

// Create a new user project mapping
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userRefId, projectRefId } = req.body;

    if (!userRefId || !projectRefId) {
      return res.status(400).json({
        success: false,
        message: 'userRefId and projectRefId are required'
      });
    }

    // Get current user from header
    let createdById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      createdById = currentUser.userId;
    }

    const result = await userProjectMappingService.createMapping({ userRefId, projectRefId }, createdById);

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

// Get all user project mappings
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await userProjectMappingService.getAllMappings();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get user project mapping by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userProjectMappingService.getMappingById(id);

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
    const result = await userProjectMappingService.getMappingsByUserId(userRefId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get mappings by project ID
router.get('/project/:projectRefId', async (req: Request, res: Response) => {
  try {
    const { projectRefId } = req.params;
    const result = await userProjectMappingService.getMappingsByProjectId(projectRefId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Update user project mapping
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userRefId, projectRefId } = req.body;

    // Get current user from header
    let updatedById: string | undefined;
    if (req.headers['currentuser']) {
      const currentUser = JSON.parse(req.headers['currentuser'] as string);
      updatedById = currentUser.userId;
    }

    const result = await userProjectMappingService.updateMapping(id, { userRefId, projectRefId }, updatedById);

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

// Delete user project mapping
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userProjectMappingService.deleteMapping(id);

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


