import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.patch(
  '/update-Admin',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin,
);

router.delete('/:id', AdminController.deleteAdmin);
router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getSingleAdmin);

export const AdminRoutes = router;
