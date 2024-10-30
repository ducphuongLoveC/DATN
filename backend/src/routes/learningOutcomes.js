import { Router } from "express";
import LearningOutcome from "../controllers/LearningOutcome.js";
import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { learningOutcomes } from "../validSchema/learningOutcomesSchema.js";

const routerLearningOutcomes = Router()
routerLearningOutcomes.get('/',LearningOutcome.get)
routerLearningOutcomes.get('/:id',LearningOutcome.getDetail)
routerLearningOutcomes.post('/',validBodyRequets(learningOutcomes),LearningOutcome.create)
routerLearningOutcomes.delete('/:id',LearningOutcome.delete)
routerLearningOutcomes.patch('/:id',validBodyRequets(learningOutcomes),LearningOutcome.update)
export default routerLearningOutcomes