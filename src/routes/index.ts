import { Router } from 'express';
import { authRoutes } from './auth.route';
import { userRoutes } from './users.route'
import { postRoutes } from './posts.route';
import { commentRoutes } from './comments.route';
import { likeRoutes } from './likes.route';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/posts',postRoutes);
routes.use('/comments',commentRoutes);
routes.use('/likes', likeRoutes)