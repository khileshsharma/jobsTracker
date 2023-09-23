import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/Job.js';
import User from './models/User.js';
try {
  await mongoose.connect(process.env.MONGO_URL);
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await User.findOne({ email: 'test@test.com' });

  const jsonProducts = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const products = jsonProducts.map((product) => {
    return { ...product, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(products);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
