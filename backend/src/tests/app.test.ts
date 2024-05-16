import request from 'supertest';
import express from 'express';
import axios from 'axios';
import { processData } from '../services/dataService';
import { mocked } from 'jest-mock';


jest.mock('axios');
jest.mock('../services/dataService');

const app = express();
const port = 5000;

app.get('/api/content', async (req, res) => {
  try {
    const response = await axios.get('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content');
    const rawData = response.data;
    const processedData = processData(rawData);
    res.json(processedData);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

describe('GET /api/content', () => {
  it('should fetch and process data successfully', async () => {
    const mockData = { data: 'mockData' };
    const processedData = 'processedData';

    mocked(axios.get).mockResolvedValueOnce(mockData as any);
    mocked(processData).mockReturnValueOnce(processedData);

    const res = await request(app).get('/api/content');

    expect(res.status).toBe(200);
    expect(res.body).toBe(processedData);
    expect(axios.get).toHaveBeenCalledWith('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content');
    expect(processData).toHaveBeenCalledWith(mockData.data);
  });

  it('should handle errors when fetching data', async () => {
    mocked(axios.get).mockRejectedValueOnce(new Error());

    const res = await request(app).get('/api/content');

    expect(res.status).toBe(500);
    expect(res.text).toBe('Error fetching data');
  });
});