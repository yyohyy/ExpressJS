import "reflect-metadata";
import express, {Express} from 'express';
import { routes } from './routes';
import { wrapAsyncRoutes } from "./helpers/asyncErrorHandler";
import { errorHandler } from './middlewares/error.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger.config";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(loggerMiddleware)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/v1/', routes);

wrapAsyncRoutes(routes);
app.use(errorHandler);

export default app;


