import { body, validationResult, param, query } from 'express-validator';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import { BadRequestError } from '../errors/customErrors.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
const withValidationErrors = (validateFn) => {
  return [
    validateFn,
    (req, res, next) => {
      console.log(req.query);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters long')
    .trim(),
]);

const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation')
    .optional()
    .notEmpty()
    .withMessage('job location is required'),
  body('jobStatus')
    .optional()
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType')
    .optional()
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid job type'),
]);

const validateIdParam = withValidationErrors([
  param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('invalid MongoDB id'),
]);

const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('email already exists');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);

const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
      return true;
    }),
  body('avatar')
    .optional()
    .custom((value, { req }) => {
      const fileSize = req.file.size;
      const maxSize = 500000; // Maximum file size in bytes
      if (fileSize > maxSize) {
        throw new Error('File size should be less than 500KB');
      }

      const fileType = req.file.mimetype;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(fileType)) {
        throw new Error('File type not allowed');
      }

      return true;
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);

const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

const validateGetAllJobsParams = withValidationErrors([
  query('search')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('search value required')
    .isString()
    .withMessage('search value must be a string'),
  query('jobStatus')
    .optional()
    .isIn(['all', ...Object.values(JOB_STATUS)])
    .withMessage('invalid job status'),
  query('jobType')
    .optional()
    .isIn(['all', ...Object.values(JOB_TYPE)])
    .withMessage('invalid job type'),
  query('sort')
    .optional()
    .isIn([...Object.values(JOB_SORT_BY)])
    .withMessage('invalid sort value'),
  query('page').optional().isInt({ min: 1 }).withMessage('invalid page value'),
]);

export {
  validateTest,
  validateJobInput,
  validateIdParam,
  validateRegisterInput,
  validateLoginInput,
  validateGetAllJobsParams,
  validateUpdateUserInput,
};
