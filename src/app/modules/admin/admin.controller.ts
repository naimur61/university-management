import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RequestHandler } from 'express';
import paginationKey from '../../../constants/constants';
import pick from '../../../shared/pick';
import httpStatus from 'http-status';
import { adminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationKey);

  const result = await AdminService.getAllAdminFromDB(
    filters,
    paginationOptions,
  );

  sendResponse<IAdmin[]>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Admin retried successful.',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const AdminID = req.params.id;
  const result = await AdminService.getSingleAdminFromDB(AdminID);

  sendResponse<IAdmin>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Admin retried successful.',
    data: result,
  });
});

const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminService.deleteAdminFromDB(id);

  sendResponse<IAdmin>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted successful!',
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const result = await AdminService.updateAdminToDB(id, body);

  sendResponse<IAdmin>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Admin updated successful.',
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
