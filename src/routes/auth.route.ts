import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { AuthRepository } from "../repository/auth.repository";
import { loginValidator, createUserValidator } from "../helpers/validators";
import { accessMiddleware } from "../config/passport.config";
import { authMiddleware } from "../middlewares/auth.middleware";


/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *           example: user1@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *           example: User1@123
 */


export const authRoutes = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: User login to get a JWT token
 *     description: Authenticate a user using their email and password to receive a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: User1@gmail.com
 *               password:
 *                 type: string
 *                 example: "User1@123"
 *     responses:
 *       '200':
 *         description: Successful login, JWT token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Bad request, validation errors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email or password is invalid."
 *       '500':
 *         description: Internal server error.
 */

authRoutes.post('/login', loginValidator, authController.login.bind(authController));

/**
 * @swagger
 * /v1/auth/refresh:
 *   post:
 *     summary: Refresh the JWT token using a valid refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The refresh token to generate a new access token
 *                 example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     responses:
 *       '200':
 *         description: New access token returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: 'new-jwt-token-example'
 *       '400':
 *         description: Invalid request or missing parameters
 *       '401':
 *         description: Unauthorized, invalid refresh token
 *       '500':
 *         description: Internal server error
 */


authRoutes.post('/refresh',authController.refresh.bind(authController));

/**
 * @swagger
 * /v1/auth/{id}/change-password:
 *   patch:
 *     summary: Change the user's password
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *         example: ee5e15ad-c34e-45ef-894f-6d67f029e260
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 description: The current password
 *                 example: myOldSecurePassword123
 *               newPassword1:
 *                 type: string
 *                 format: password
 *                 description: The new password to set
 *                 example: myNewSecurePassword456
 *               newPassword2:
 *                 type: string
 *                 format: password
 *                 description: Confirmation of the new password
 *                 example: myNewSecurePassword456
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '400':
 *         description: Validation errors or mismatch in passwords
 *       '401':
 *         description: Unauthorized, invalid token
 *       '500':
 *         description: Internal server error
 */

authRoutes.patch('/:id/change-password', accessMiddleware, authController.changePassword.bind(authController));

/**
 * @swagger
 * /v1/auth/delete/{id}:
 *   delete:
 *     summary: Delete a user by their ID (requires password)
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *           example: c32179ca-7341-491e-a4bf-cb29415e116e
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: User's password for authentication
 *                 example: myPassword123
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Invalid request or missing parameters
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

authRoutes.delete('/delete/:id', authMiddleware, authController.deleteUser.bind(authController))




