import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createDepartment,
);
router.patch(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.updateDepartment,
);

router.get('/', ManagementDepartmentController.getDepartments);
router.delete('/:id', ManagementDepartmentController.deleteDepartment);
router.get('/:id', ManagementDepartmentController.getSingleDepartment);

export const ManagementDepartmentRoutes = router;
