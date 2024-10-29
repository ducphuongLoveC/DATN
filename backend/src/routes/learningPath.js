import { Router } from "express";
import learningPath from "../controllers/LerningPathController.js"
import { checkAuth, checkRoles } from "../middlewares/checkAuth.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { learningPathSchema } from "../validSchema/learningPathSchema.js";

const routerLearningPath = Router();
routerLearningPath.get('/', learningPath.getAll);
routerLearningPath.get('/:id', learningPath.getDetail);
// routerLearningPath.use('/', checkAuth,  checkRoles(['admin', 'post manager']))
routerLearningPath.post('/',validBodyRequets(learningPathSchema), learningPath.create);
routerLearningPath.patch('/:id',validBodyRequets(learningPathSchema), learningPath.update);
routerLearningPath.delete('/:id', learningPath.delete);

export default routerLearningPath;