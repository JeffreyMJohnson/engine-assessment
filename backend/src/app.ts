import express from 'express';
import axios from 'axios';
import { processData } from './services/dataService';

const cors = require('cors');

const app = express();
app.use(cors());

const port = 5000;

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
