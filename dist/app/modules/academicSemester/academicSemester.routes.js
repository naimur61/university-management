"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const AcademicSemesterController_1 = require("./AcademicSemesterController");
const router = express_1.default.Router();
router.post('/create-semester', (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterZodSchema), AcademicSemesterController_1.AcademicSemesterController.createSemester);
router.patch('/:id', (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.updateAcademicSemesterZodSchema), AcademicSemesterController_1.AcademicSemesterController.updateSemester);
router.delete('/:id', AcademicSemesterController_1.AcademicSemesterController.deleteSemester);
router.get('/', AcademicSemesterController_1.AcademicSemesterController.getAllSemesters);
router.get('/:id', AcademicSemesterController_1.AcademicSemesterController.getSingleSemester);
exports.SemesterRoutes = router;
