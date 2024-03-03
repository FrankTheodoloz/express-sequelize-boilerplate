import {Router} from "express";

import tasksController from "../controllers/tasksController";
import {
    isTaskExistsCreate, isTaskExistsUpdate, validationCreate, validationDelete, validationUpdate
} from "../middlewares/taskMiddleware";

const router = Router();
router.get('/tasks', tasksController.getAll);
router.get('/tasks/:id', tasksController.getOne);
router.post('/tasks', [validationCreate, isTaskExistsCreate], tasksController.create);
router.put('/tasks', [validationUpdate, isTaskExistsUpdate], tasksController.update);
router.delete('/tasks', [validationDelete], tasksController.delete);
router.post('/tasks/update_picture', tasksController.updatePicture);
router.post('/tasks/send_email', tasksController.sendEmail);

module.exports = router;
