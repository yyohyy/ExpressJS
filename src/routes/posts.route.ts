import { Router } from "express";
import { PostController } from "../controllers/posts.controller";
import '../config/passport.config'
import { PostRepository } from "../repository/posts.repository";
import { PostService } from "../services/post.service";
import { ownerMiddleware } from "../middlewares/creator.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";


/** 
* @swagger
* components:
*  schemas:
*    Post:
*     type: object
*     required:
*       -title
*       -content
*     properties:
*        id:
*           type: string
*        title:
*           type: string
*        content:
*            type: string
*     example:
*       title: Water shortage
*       content: Water distributed after extremely long intervals of time.
*/


export const postRoutes = Router();

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService)


/**
 * @swagger
 * /v1/posts:
 *   get:
 *     summary: Retrieve all posts
 *     description: Fetch a list of all posts from the database.
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: Successfully retrieved all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '500':
 *         description: Internal server error
 */

postRoutes.get('/', postController.viewAllPosts.bind(postController));

/**
 * @swagger
 * /v1/posts/new:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: uuid
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Water shortage
 *                     content:
 *                       type: string
 *                       example: Water distributed after extremely long intervals of time.
 *                 message:
 *                   type: string
 *                   example: Successfully created post.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Title is required.
 */

postRoutes.post('/new', authMiddleware, postController.createPost.bind(postController));

/**
 * @swagger
 * /v1/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieve the details of a specific post using its unique ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the post.
 *         schema:
 *           type: string
 *           example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     responses:
 *       '200':
 *         description: Successfully retrieved post details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: uuid
 *                   example: c32179ca-7341-491e-a4bf-cb29415e116e
 *                 title:
 *                   type: string
 *                   example: "Water shortage"
 *                 content:
 *                   type: string
 *                   example: "Water distributed after extremely long intervals of time."
 *                 user:
 *                   type: uuid
 *                   description: ID of the user who created the post.
 *                   example: "64b2f05c1234567890abcd01"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-22T10:45:30Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-22T12:00:00Z"
 *       '404':
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Post not found."
 *       '500':
 *         description: Internal server error.
 */


postRoutes.get('/:id', postController.viewPost.bind(postController));

/**
 * @swagger
 * /v1/posts/edit/{id}:
 *   patch:
 *     summary: Edit Post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the post.
 *         schema:
 *           type: string
 *           example: 6a4b0e4b-d48d-4f02-94f9-7ad2f881e8c3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: This is the title [Updated]
 *               content:
 *                 type: string
 *                 example: "Updated content of the post."
 *     responses:
 *       '200':
 *         description: Post updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 content:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 */


postRoutes.patch('/edit/:id', authMiddleware, postController.editPost.bind(postController));

/**
 * @swagger
 * /v1/posts/delete/{id}:
 *   delete:
 *     summary: Delete Post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the post.
 *         schema:
 *           type: string
 *           example: 6a4b0e4b-d48d-4f02-94f9-7ad2f881e8c3
 *     responses:
 *       '200':
 *         description: Post deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post deleted successfully."
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 */

postRoutes.delete('/delete/:id', authMiddleware, postController.deletePost.bind(postController));

/**
 * @swagger
 * /v1/posts/user/{id}:
 *   get:
 *     summary: View All Posts of a User
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user whose posts are being fetched.
 *         schema:
 *           type: string
 *           example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     responses:
 *       '200':
 *         description: List of posts for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   likesCount:
 *                     type: integer
 *                   commentsCount:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 */

postRoutes.get('/user/:id', authMiddleware ,postController.viewUserAllPosts.bind(postController));