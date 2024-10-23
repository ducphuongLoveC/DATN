import { Router } from "express";
import LearningOutcome from "../controllers/LearningOutcome.js";

const routerLearningOutcomes = Router()
routerLearningOutcomes.get('/',LearningOutcome.get)
routerLearningOutcomes.get('/:id',LearningOutcome.getDetail)
routerLearningOutcomes.post('/',LearningOutcome.create)
routerLearningOutcomes.delete('/:id',LearningOutcome.delete)
routerLearningOutcomes.patch('/:id',LearningOutcome.update)
export default routerLearningOutcomes