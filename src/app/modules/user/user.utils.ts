import { User } from './user.model';

const findLastUserId = async () => {
  const leastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  const newUser = leastUser ? parseInt(leastUser.id) + 1 : 1;
  return newUser;
};

export const generateUserId = async () => {
  const newId = await findLastUserId();
  const incrementId = await newId.toString().padStart(5, '0');
  return incrementId;
};
