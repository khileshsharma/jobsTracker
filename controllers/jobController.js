import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import day from 'dayjs';

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }
  checkPermissions(req.user, job.createdBy);

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }

  checkPermissions(req.user, job.createdBy);
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ job: removedJob });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
