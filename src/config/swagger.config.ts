import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Documentation for Project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], 
};

export default swaggerJSDoc(swaggerSpec);
