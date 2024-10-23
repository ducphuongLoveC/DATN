import { Router } from "express";
import LearningOutcome from "../controllers/LearningOutcome.js";

const routerLearningOutcomes = Router()
routerLearningOutcomes.post('/',LearningOutcome.create)
routerLearningOutcomes.get('/',LearningOutcome.get)
routerLearningOutcomes.get('/:id',LearningOutcome.getDetail)
routerLearningOutcomes.delete('/:id',LearningOutcome.delete)
routerLearningOutcomes.patch('/:id',LearningOutcome.update)
export default routerLearningOutcomes