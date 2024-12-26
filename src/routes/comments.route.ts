import { Router } from "express";
import { CommentRepository } from "../repository/comments.repository";
import { CommentService } from "../services/comment.service";
import { CommentController } from "../controllers/comment.controller";
import { accessMiddleware } from "../config/passport.config";
import { ownerMiddleware } from "../middlewares/creator.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who made the comment
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         postId:
 *           type: string
 *           format: uuid
 *           description: The ID of the post being commented on
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         content:
 *           type: string
 *           description: The content of the comment
 *           example: "This post is really insightful, thanks for sharing!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the comment was made
 *           example: "2024-11-22T12:34:56Z"
 */


export const commentRoutes = Router();

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

/**
 * @swagger
 * /v1/comments/{id}:
 *   get:
 *     summary: Get all comments of a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the post
 *         example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     responses:
 *       '200':
 *         description: Successfully retrieved comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */


commentRoutes.get('/:id', commentController.getComments.bind(commentController));

/**
 * @swagger
 * /v1/comments/{id}/new:
 *   post:
 *     summary: Add a comment to a specific post
 *     tags: [Comments]
*     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the post
 *         example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text of the comment
 *                 example: This is a great post!
 *     responses:
 *       '201':
 *         description: Comment successfully added
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */


commentRoutes.post('/:id/new', accessMiddleware, commentController.postComment.bind(commentController));

/**
 * @swagger
 * /v1/comments/{commentId}/delete:
 *   delete:
 *     summary: Delete a specific comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the comment
 *         example: 1
 *     responses:
 *       '200':
 *         description: Comment successfully deleted
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */


commentRoutes.delete('/:commentId/delete', authMiddleware, commentController.deleteComment.bind(commentController));

/**
 * @swagger
 * /v1/comments/{commentId}/edit:
 *   patch:
 *     summary: Update a specific comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the comment
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The updated text of the comment
 *                 example: I updated my comment!
 *     responses:
 *       '200':
 *         description: Comment successfully updated
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */


commentRoutes.patch('/:commentId/edit', authMiddleware, commentController.editComment.bind(commentController));
