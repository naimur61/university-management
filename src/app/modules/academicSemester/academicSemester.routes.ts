import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './AcademicSemesterController';

const router = express.Router();

router.get('/', AcademicSemesterController.getAllSemesters);

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);

export const SemesterRoutes = router;
