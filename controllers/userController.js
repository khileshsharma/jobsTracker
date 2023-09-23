import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Job from '../models/Job.js';
import { promises as fs } from 'fs';
import { UnauthenticatedError } from '../errors/customErrors.js';
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new UnauthenticatedError('invalid credentials');
  }
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newAvatar = req.file;
  if (newAvatar) {
    req.body.avatar = `/uploads/${newAvatar.filename}`;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);

  if (newAvatar && updatedUser.avatar) {
    await fs.unlink(`public${updatedUser.avatar}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};
