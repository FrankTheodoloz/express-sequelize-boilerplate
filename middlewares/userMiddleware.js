import yup from "yup";
import jwt from "jsonwebtoken";
import {Op} from "sequelize";

import {User} from "../db";

let schemaSignup = yup.object().shape({
    email: yup
        .string()
        .required('Please enter Email')
        .email('Please enter valid Email'), password: yup
        .string()
        .required('Please enter New Password')
        .min(6, 'Please enter minimum 6 characters'),
});

module.exports.validationSignup = (req, res, next) => {
    schemaSignup
        .validate({
            email: req.body.email, password: req.body.password,
        }, {abortEarly: false})
        .then(() => {
            next();
        })
        .catch(err => next(err));
};

module.exports.isUserExistsSignup = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {email: req.body.email},
        });

        if (user) {
            let err = new Error('User already registered');
            err.field = 'task';
            return next(err);
        }

        next();
    } catch (err) {
        return next(err);
    }
};

let schemaLogin = yup.object().shape({
    email: yup
        .string()
        .required('Please enter Email')
        .email('Please enter valid Email'), password: yup
        .string()
        .required('Please enter New Password')
        .min(6, 'Please enter minimum 6 characters'),
});

module.exports.validateLogin = (req, res, next) => {
    schemaLogin
        .validate({
            email: req.body.email, password: req.body.password,
        }, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

module.exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token.replace(/^Bearer\s/, ''), process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                let err = new Error('Unauthorized');
                err.field = 'login';
                return next(err);
            } else {
                req.user = decoded;
                return next();
            }
        });
    } else {
        let err = new Error('Unauthorized');
        err.field = 'login';
        return next(err);
    }
};

let schemaUpdateProfile = yup.object().shape({
    first_name: yup.string().required('Please enter first name'),
    last_name: yup.string().required('Please enter last name'),
    bio: yup.string(),
    email: yup
        .string()
        .required()
        .required('Please enter Email')
        .email('Please enter valid Email'),
});

module.exports.validationUpdateProfile = (req, res, next) => {
    schemaUpdateProfile
        .validate({
            first_name: req.body.first_name, last_name: req.body.last_name, bio: req.body.bio, email: req.body.email,
        }, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

module.exports.isUserExistsUpdate = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {email: req.body.email, id: {[Op.ne]: req.user.id}},
        });

        if (user) {
            let err = new Error('Email already registered.');
            err.field = 'email';
            return next(err);
        }

        next();
    } catch (err) {
        return next(err);
    }
};

let schemaChangePassword = yup.object().shape({
    new_password: yup
        .string()
        .required('Please enter New Password')
        .min(6, 'Please enter minimum 6 characters'), repeat_new_password: yup
        .string()
        .required('Please repeat new Password')
        .min(6, 'Please enter minimum 6 characters')
        .oneOf([yup.ref('new_password'), null], 'New password and repeat password mismatch'),
});

module.exports.validationChangePassword = (req, res, next) => {
    schemaChangePassword
        .validate({
            new_password: req.body.new_password, repeat_new_password: req.body.repeat_new_password,
        }, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

let schemaForgotPassword = yup.object().shape({
    email: yup
        .string()
        .required('Please enter Your registered email')
        .email('Please enter valid Email'),
});

module.exports.validationForgotPassword = (req, res, next) => {
    schemaForgotPassword
        .validate({email: req.body.email}, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

module.exports.isEmailRegistered = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {email: req.body.email},
        });

        if (user) {
            next();
        } else {
            let err = new Error('No user registered with this email');
            err.field = 'email';
            return next(err);
        }
    } catch (err) {
        return next(err);
    }
};

let schemaResetPassword = yup.object().shape({
    new_password: yup
        .string()
        .required('Please enter New Password')
        .min(6, 'Please enter minimum 6 characters'),
    repeat_new_password: yup
        .string()
        .required('Please repeat new Password')
        .min(6, 'Please enter minimum 6 characters')
        .oneOf([yup.ref('new_password'), null], 'New password and repeat password mismatch'),
    token: yup.string().required('Reset password token not found'),
});

module.exports.validationResetPassword = (req, res, next) => {
    schemaResetPassword
        .validate({
            new_password: req.body.new_password,
            repeat_new_password: req.body.repeat_new_password,
            token: req.body.token,
        }, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

module.exports.isResetTokenValid = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {token: req.body.token},
        });

        if (user) {
            next();
        } else {
            let err = new Error('Invalid reset link or token');
            err.field = 'email';
            return next(err);
        }
    } catch (err) {
        return next(err);
    }
};
