import {Router} from "express";

import * as usersController from "../controllers/usersController.js";
import {
    authenticateToken,
    isEmailRegistered,
    isResetTokenValid,
    isUserExistsSignup,
    isUserExistsUpdate,
    validateLogin,
    validationChangePassword,
    validationForgotPassword,
    validationResetPassword,
    validationSignup,
    validationUpdateProfile
} from "../middlewares/userMiddleware.js";

export const router = Router()
    .post('/user/signup', [validationSignup, isUserExistsSignup], usersController.signUp) // sends verification link to user
    .get('/user/signup/verify/:token', usersController.signUpVerify) // verify user link when clicked
    .post('/user/login', [validateLogin], usersController.login)
    .get('/user', [authenticateToken], usersController.getLoggedInUser) // get logged in user
    .post('/user/update_profile', [authenticateToken, validationUpdateProfile, isUserExistsUpdate], usersController.updateProfile)
    .post('/user/change_password', [authenticateToken, validationChangePassword], usersController.changePassword)
    .post('/user/forgot_password', [validationForgotPassword, isEmailRegistered], usersController.forgotPassword) // sends reset link to user
    .get('/user/forgot_password/verify/:token', usersController.forgotPasswordVerify) // verify reset link when clicked
    .post('/user/reset_password', [validationResetPassword, isResetTokenValid], usersController.resetPassword); // reset to new password
