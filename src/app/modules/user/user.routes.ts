import { validate } from '@app/middlewares/validation';
import { Router } from 'express';
import { userController } from './user.controller';
import {
  userLoginValidate,
  userUpdateValidate,
  userValidate,
} from './user.validation';

const userRoutes = Router();

userRoutes.post(
  '/create-user',
  validate(userValidate),
  userController.createUser
);

userRoutes.post(
  '/login',
  validate(userLoginValidate),
  userController.loginUser
);

userRoutes.get('/me', userController.getMe);

userRoutes.patch(
  '/update-user/:id',
  validate(userUpdateValidate),
  userController.updateUser
);

userRoutes.get('/all-users', userController.getAllUsers);

export default userRoutes;
