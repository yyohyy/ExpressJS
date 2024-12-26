import { Router } from "express";
import { LikeRepository } from "../repository/like.repository";
import { PostLikeService } from "../services/like.service";
import { PostLikeController } from "../controllers/likes.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - userId
 *         - postId
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who liked the post
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         postId:
 *           type: string
 *           format: uuid
 *           description: The ID of the post being liked
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the like was made
 *           example: "2024-11-22T12:34:56Z"
 */

export const likeRoutes = Router();

const likeRepository = new LikeRepository();
const likeService = new PostLikeService(likeRepository);
const likeController = new PostLikeController(likeService);

/**
 * @swagger
 * /v1/likes/post/{postId}:
 *   post:
 *     summary: Like a specific post
 *     tags: [Likes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the post to like
 *         example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     responses:
 *       '200':
 *         description: Post successfully liked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post liked successfully."
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */


likeRoutes.post('/post/:postId', authMiddleware, likeController.likePost.bind(likeController));

/**
 * @swagger
 * /v1/likes/post/{postId}:
 *   delete:
 *     summary: Unlike a specific post
 *     tags: [Likes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the post to unlike
 *         example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     responses:
 *       '200':
 *         description: Post successfully unliked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post unliked successfully."
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */

likeRoutes.delete('/post/:postId', authMiddleware, likeController.removeLike.bind(likeController))

/**
 * @swagger
 * /v1/likes/post/{postId}:
 *   get:
 *     summary: Get all likes for a specific post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the post
 *         example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     responses:
 *       '200':
 *         description: A list of likes for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: d1234567-e89b-12d3-a456-426614174000
 *                       likedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-21T15:23:01.123Z"
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
likeRoutes.get('/post/:postId', likeController.getLikes.bind(likeController))