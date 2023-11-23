import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import paginationKey from '../../../constants/constants';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createSemester: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicSemesterData } = req.body;
  const result =
    await AcademicSemesterService.createSemesterToDB(academicSemesterData);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Semester successfully created!',
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemesterFromBD(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Semester retrieve successfully!',
    data: result,
  });
});

const getAllSemesters: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationKey);

  const result = await AcademicSemesterService.getSemestersFromDB(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicSemester[]>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successful!',
    meta: result.meta,
    data: result.data,
  });
});

const updateSemester: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const result = await AcademicSemesterService.updateSemesterToDB(id, body);

  sendResponse<IAcademicSemester>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Updated successful!',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
