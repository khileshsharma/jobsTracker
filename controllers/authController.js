import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

const register = async (req, res) => {
  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  // check if password is correct

  const user = await User.findOne({ email });

  const isValidUser = user && (await comparePassword(password, user.password));
  if (!isValidUser) {
    throw new UnauthenticatedError('invalid credentials');
  }

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.CREATED).json({ msg: 'user logged in' });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export { register, login, logout };
