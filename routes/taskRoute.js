import {Router} from "express";

import * as tasksController from "../controllers/tasksController.js";
import {
    isTaskExistsCreate, isTaskExistsUpdate, validationCreate, validationDelete, validationUpdate
} from "../middlewares/taskMiddleware.js";

export const router = Router()
    .get('/tasks', tasksController.getAll)
    .get('/tasks/:id', tasksController.getOne)
    .post('/tasks', [validationCreate, isTaskExistsCreate], tasksController.create)
    .put('/tasks', [validationUpdate, isTaskExistsUpdate], tasksController.update)
    .delete('/tasks', [validationDelete], tasksController.remove)
    .post('/tasks/update_picture', tasksController.updatePicture)
    .post('/tasks/send_email', tasksController.sendEmail);
