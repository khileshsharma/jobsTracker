import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const token = jwt.sign(payload, 60*60*24*30, {
    expiresIn: 60*60*24*30
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, 60*60*24*30);
  return decoded;
};
