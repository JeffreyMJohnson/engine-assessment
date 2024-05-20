import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/routes';

const CONTENT_API_URL = process.env.CONTENT_API_URL || 'https://stoplight.io/mocks/engine/fullstack-spec/52502230/content';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Content API",
      description: "Content API Information",
      contact: {
        name: "Jeffrey Johnson"
      },
      servers: [`http://localhost:${PORT}`]
    }
  },
  apis: ["src/routes/routes.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use routes
app.use('/api/content', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
