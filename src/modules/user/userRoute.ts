import { Router, Request, Response } from 'express';
import { userService } from './userService';

const router = Router();

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { firstName, middleName, lastName, email, mobileNumber, password, userStatus } = req.body;

    // Validate required fields
    if (!firstName || !email || !mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message: 'firstName, email, mobileNumber, and password are required'
      });
    }

    const result = await userService.createUser({
      firstName,
      middleName,
      lastName,
      email,
      mobileNumber,
      password,
      userStatus
    });

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

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getUserById(id);

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

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.createdAt;
    delete updateData.createdBy;

    const result = await userService.updateUser(id, updateData);

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

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);

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


