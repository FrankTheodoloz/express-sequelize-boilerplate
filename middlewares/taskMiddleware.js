import yup from "yup";
import {Op} from "sequelize";

import {Task} from "../db";

let schemaCreate = yup.object().shape({
    task: yup.string().required(), picture: yup.string(), status: yup.number().default(0),
});

module.exports.validationCreate = (req, res, next) => {
    schemaCreate
        .validate({task: req.body.task}, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

module.exports.isTaskExistsCreate = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            where: {task: req.body.task},
        });

        if (task) {
            let err = new Error('Task already exists');
            err.field = 'task';
            return next(err);
        }

        next();
    } catch (err) {
        return next(err);
    }
};

let schemaUpdate = yup.object().shape({
    id: yup.number().required(), task: yup.string().required(), picture: yup.string(), status: yup.number().default(0),
});

module.exports.validationUpdate = (req, res, next) => {
    schemaUpdate
        .validate({id: req.body.id, task: req.body.task}, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

module.exports.isTaskExistsUpdate = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            where: {task: req.body.task, id: {[Op.ne]: req.body.id}},
        });

        if (task) {
            let err = new Error('Task already exists');
            err.field = 'task';
            return next(err);
        }

        next();
    } catch (err) {
        return next(err);
    }
};

let schemaDelete = yup.object().shape({
    id: yup.number().required(),
});

module.exports.validationDelete = (req, res, next) => {
    schemaDelete
        .validate({id: req.body.id}, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};
