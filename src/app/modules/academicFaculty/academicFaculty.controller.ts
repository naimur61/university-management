import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import paginationKey from '../../../constants/constants';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicFacultyData } = req.body;
  const result =
    await AcademicFacultyService.createFacultyToDB(academicFacultyData);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculty successfully created!',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFacultyFromBD(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieve successfully!',
    data: result,
  });
});

const getAllFaculties: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicFacultyFilterableFields);

  const paginationOptions = pick(req.query, paginationKey);

  const result = await AcademicFacultyService.getFacultiesFromDB(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculties retrieved successful!',
    meta: result.meta,
    data: result.data,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const result = await AcademicFacultyService.updateFacultyToDB(id, body);

  sendResponse<IAcademicFaculty>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Updated successful!',
    data: result,
  });
});

const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.deleteFacultyFromDB(id);

  sendResponse<IAcademicFaculty>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Deleted successful!',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
