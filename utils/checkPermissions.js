import { UnauthorizedError } from '../errors/customErrors.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError('not authorized to access this route');
};

export default checkPermissions;
