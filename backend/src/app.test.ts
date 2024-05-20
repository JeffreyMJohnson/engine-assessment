import request from 'supertest';
import express from 'express';
import axios from 'axios';
import { processData, Content } from './services/dataService';
import { mocked } from 'jest-mock';

jest.mock('axios');
jest.mock('./services/dataService');

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
    const mockData = {
      data: {
        contentCards: [
          {
            id: '1',
            imageUri: 'https://example.com/image.jpg',
            textData: {
              title: 'Title',
              subTitle: 'Subtitle',
              body: 'Body',
              author: {
                first: 'John',
                last: 'Doe'
              }
            },
            metadata: {
              priority: 1,
              publishDate: '2022-01-01'
            },
            comments: [
              {
                text: 'Comment',
                author: 'Commenter',
                profilePic: 'https://example.com/profile.jpg',
                likes: 10
              }
            ]
          }
        ]
      }
    };

    const processedData: Content[] = [
      {
        id: '1',
        title: 'Title',
        subTitle: 'Subtitle',
        body: 'Body',
        author: 'John Doe',
        imageUri: 'https://example.com/image.jpg',
        priority: 1,
        comments: [
          {
            text: 'Comment',
            author: 'Commenter',
            profilePic: 'https://example.com/profile.jpg',
            likes: 10
          }
        ]
      }
    ];

    mocked(axios.get).mockResolvedValueOnce(mockData as any);
    mocked(processData).mockReturnValueOnce(processedData);

    const res = await request(app).get('/api/content');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(processedData);
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
