import yup from "yup";
import {Op} from "sequelize";

import {Task} from "../db.js";

let schemaCreate = yup.object().shape({
    task: yup.string().required(), picture: yup.string(), status: yup.number().default(0),
});

export const validationCreate = (req, res, next) => {
    schemaCreate
        .validate({task: req.body.task}, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

export const isTaskExistsCreate = async (req, res, next) => {
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

export const validationUpdate = (req, res, next) => {
    schemaUpdate
        .validate({id: req.body.id, task: req.body.task}, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};

export const isTaskExistsUpdate = async (req, res, next) => {
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

export const validationDelete = (req, res, next) => {
    schemaDelete
        .validate({id: req.body.id}, {abortEarly: false})
        .then(() => next())
        .catch(err => next(err));
};
