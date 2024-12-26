import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repository/users.repository";
import { accessMiddleware }  from '../config/passport.config'
import { AuthRepository } from "../repository/auth.repository";
import { checkRoleMiddlware } from "../middlewares/role.middleware";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - password2
 *         - role
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: uuid
 *           example: c32179ca-7341-491e-a4bf-cb29415e116e
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password.
 *           example: userpassword123
 *         password2:
 *           type: string
 *           format: password
 *           description: The confirmation password. Must match `password`.
 *           example: userpassword123
 *         phoneNo:
 *           type: number
 *           description: The user's phone number. 
 *           example: 9801234567
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: The user's role in the system.
 *           example: user
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *           example: John
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *           example: Doe
 *       example:
 *         email: user@example.com
 *         password: userpassword123
 *         password2: userpassword123
 *         phoneNo: 9801234567 [optional]
 *         role: user
 *         firstName: John
 *         lastName: Doe
 */



export const userRoutes = Router();

const userRepository = new UserRepository();
const authRepository = new AuthRepository();
const userService = new UserService(userRepository, authRepository);
const userController = new UserController(userService);

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Displays all the user. Can only be accessed by admins
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: All users successfully displayed.
 *       '401':
 *         description: Unauthorized access point
 *       '500':
 *         description: Internal server error
 */

userRoutes.get('/', checkRoleMiddlware, userController.viewAllUsers.bind(userController));

/**
 * @swagger
 * /v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User successfully registered
 *       '400':
 *         description: Validation errors
 *       '500':
 *         description: Internal server error
 */


userRoutes.post('/register',userController.register.bind(userController));

/**
 * @swagger
 * /v1/users/{id}/profile:
 *   get:
 *     summary: View User Profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *           example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 */



userRoutes.get('/:id', accessMiddleware , userController.lookup.bind(userController));

