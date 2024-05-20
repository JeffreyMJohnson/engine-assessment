import { Router } from 'express';
import axios from 'axios';
import { processData } from '../services/dataService';

const router = Router();
const CONTENT_API_URL = process.env.CONTENT_API_URL || 'https://stoplight.io/mocks/engine/fullstack-spec/52502230/content';

/**
 * @swagger
 * /api/content:
 *  get:
 *    description: Use to request content
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(CONTENT_API_URL, {
      headers: {
        'Accept': 'application/json',
        'Prefer': 'code=200, dynamic=true'
      }
    });
    const rawData = response.data;
    const processedData = processData(rawData);
    res.json(processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

export default router;
