import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.patch(
  '/update-faculty',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty,
);

router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);

export const FacultyRoutes = router;
