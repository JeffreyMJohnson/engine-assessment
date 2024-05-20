import request from 'supertest';
import express from 'express';
import axios from 'axios';
import { processData, Content } from './services/dataService';
import { mocked } from 'jest-mock';
import routes from './routes/routes';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

jest.mock('axios');
jest.mock('./services/dataService');

const CONTENT_API_URL = process.env.CONTENT_API_URL || 'https://stoplight.io/mocks/engine/fullstack-spec/52502230/content';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

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
app.use('/api/content', routes);

describe('App setup', () => {
  it('should set up Swagger UI', async () => {
    const res = await request(app).get('/api-docs').redirects(1); // Follow redirect
    expect(res.status).toBe(200);
    expect(res.text).toContain('Swagger UI');
  });

  describe('GET /api/content', () => {
    let originalConsoleError: typeof console.error;

    beforeEach(() => {
      // Save the original console.error function
      originalConsoleError = console.error;
      // Mock console.error to suppress errors during tests
      console.error = jest.fn();
    });

    afterEach(() => {
      // Restore the original console.error function after each test
      console.error = originalConsoleError;
    });

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
      expect(axios.get).toHaveBeenCalledWith(CONTENT_API_URL, {
        headers: {
          'Accept': 'application/json',
          'Prefer': 'code=200, dynamic=true'
        }
      });
      expect(processData).toHaveBeenCalledWith(mockData.data);
    });

    it('should handle errors when fetching data', async () => {
      mocked(axios.get).mockRejectedValueOnce(new Error());

      const res = await request(app).get('/api/content');

      expect(res.status).toBe(500);
      expect(res.text).toBe('Error fetching data');
    });

    it('should not include malformed data in the response', async () => {
      const mockData = {
        data: {
          contentCards: [
            {
              id: '1',
              textData: {
                title: 'Title',
                subTitle: 'Subtitle',
                body: 'Body',
                author: {
                  first: 'John',
                  last: 'Doe'
                }
              },
              comments: []
            },
            {
              id: '2',
              imageUri: 'https://example.com/image2.jpg',
              textData: {
                title: 'Title 2',
                subTitle: 'Subtitle 2',
                body: 'Body 2',
                author: {
                  first: 'Jane',
                  last: 'Smith'
                }
              },
              metadata: {
                priority: 3,
                publishDate: '2022-01-03'
              },
              comments: [
                {
                  text: 'Comment 2',
                  author: 'Commenter 2',
                  profilePic: 'https://example.com/profile2.jpg',
                  likes: 30
                }
              ]
            }
          ]
        }
      };

      const processedData: Content[] = [
        {
          id: '2',
          title: 'Title 2',
          subTitle: 'Subtitle 2',
          body: 'Body 2',
          author: 'Jane Smith',
          imageUri: 'https://example.com/image2.jpg',
          priority: 3,
          comments: [
            {
              text: 'Comment 2',
              author: 'Commenter 2',
              profilePic: 'https://example.com/profile2.jpg',
              likes: 30
            }
          ]
        }
      ];

      mocked(axios.get).mockResolvedValueOnce(mockData as any);
      mocked(processData).mockReturnValueOnce(processedData);

      const res = await request(app).get('/api/content');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(processedData);
    });
  });
});
