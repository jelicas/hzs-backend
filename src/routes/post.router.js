import { Router } from "express";
import { authorizeUser } from "../utils/jwt.js";
import { postController } from "../controllers/post.controller.js"

const postRouter = Router();

postRouter.get("", authorizeUser, postController.getPosts);

postRouter.get("/:id", postController.getPost);

postRouter.post("", postController.createPost);

postRouter.delete("/:id", postController.deletePost);

postRouter.put("/:id", postController.updatePost);

postRouter.patch("/:id", postController.updatePost);

postRouter.get("/:id/comments", postController.getPostComments);

postRouter.post("/:id/comments", postController.addComment);

export { postRouter };