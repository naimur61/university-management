import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createDepartment,
);
router.patch(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateDepartment,
);

router.get('/', AcademicDepartmentController.getDepartments);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

export const DepartmentRoutes = router;
