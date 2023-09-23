import { Router } from 'express';
const router = Router();
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the directory where uploaded files will be stored
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    // set the name of the uploaded file
    cb(null, fileName);
  },
});

const upload = multer({ storage });

import { authorizePermissions } from '../middleware/authMiddleware.js';

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import checkForDemoUser from '../middleware/checkForDemoUser.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  getApplicationStats,
]);
router.patch('/update-user', [
  checkForDemoUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser,
]);
export default router;

// test
