import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

// router.patch('/:id', UserController.deleteUser);

router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getUser);
router.get('/:id', UserController.getSingleUser);

export const UserRoutes = router;
