import { Router } from "express";
import CommentController from "../controllers/CommentController.js";
// import { validBodyRequets } from "../middlewares/validbodyRequets.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const routerComment = Router();

// Lấy danh sách bình luận
routerComment.get("/:resource_id", CommentController.getComments);
routerComment.get("/", CommentController.getAllComments);
routerComment.post("/", CommentController.createComment);
routerComment.delete("/:id", checkAuth, CommentController.deleteComment);

export default routerComment;
