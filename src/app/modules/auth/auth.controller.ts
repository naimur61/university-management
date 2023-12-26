import catchAsync from '../../../shared/catchAsync';

const userLogin = catchAsync(async (req, res) => {
  console.log(req.body);
});

export const AuthController = { userLogin };
