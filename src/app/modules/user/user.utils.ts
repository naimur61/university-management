import { User } from './user.model';

const findLastUserID = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  const newUser = lastUser ? parseInt(lastUser.id.slice(-3)) + 1 : 1;

  return newUser;
};

const generateUserId = async () => {
  const newUser = await findLastUserID();

  const currentYear = (new Date().getFullYear() % 100).toString();

  const increment = await newUser.toString().padStart(3, '0');

  return currentYear + increment;
};

export default generateUserId;
