import express from 'express';
import axios from 'axios';
import { processData } from './services/dataService';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const cors = require('cors');

const app = express();
app.use(cors());

const port = 5000;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Content API",
      description: "Content API Information",
      contact: {
        name: "Jeffrey Johnson"
      },
      servers: ["http://localhost:5000"]
    }
  },
  apis: ["src/app.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/content:
 *  get:
 *    description: Use to request content
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/api/content', async (req, res) => {
  try {
    const response = await axios.get('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content',
    {
      headers: {
        'Accept': 'application/json',
        'Prefer': 'code=200, dynamic=true'
      }
    });
    const rawData = response.data;
    const processedData = processData(rawData);
    res.json(processedData);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
