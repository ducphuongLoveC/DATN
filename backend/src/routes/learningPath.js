import { Router } from "express";
import learningPath from "../controllers/LerningPathController.js"

const routerLearningPath = Router();
routerLearningPath.post('/', learningPath.create);
routerLearningPath.get('/', learningPath.getAll);
routerLearningPath.get('/:id', learningPath.getDetail);
routerLearningPath.patch('/:id', learningPath.update);
routerLearningPath.delete('/:id', learningPath.delete);

export default routerLearningPath;
