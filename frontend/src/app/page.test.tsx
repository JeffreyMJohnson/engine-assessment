import { render, screen, waitFor } from '@testing-library/react';
import Home from './page';
import { Content } from './components/ContentFeed/ContentFeed';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home', () => {
  const mockContent: Content[] = [
    {
      id: '1',
      title: 'Test Title 1',
      subTitle: 'Test Subtitle 1',
      body: 'Test Body 1',
      author: 'Author 1',
      imageUri: 'https://example.com/image1.jpg',
      comments: [
        {
          text: 'Comment 1',
          author: 'Commenter 1',
          profilePic: 'https://example.com/profile1.jpg',
          likes: 10
        }
      ]
    },
    {
      id: '2',
      title: 'Test Title 2',
      subTitle: 'Test Subtitle 2',
      body: 'Test Body 2',
      author: 'Author 2',
      imageUri: 'https://example.com/image2.jpg',
      comments: [
        {
          text: 'Comment 2',
          author: 'Commenter 2',
          profilePic: 'https://example.com/profile2.jpg',
          likes: 20
        }
      ]
    }
  ];

  it('renders content cards after fetching data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockContent });
    render(await Home());

    await waitFor(() => {
      mockContent.forEach(content => {
        expect(screen.getByText(content.title)).toBeInTheDocument();
        expect(screen.getByText(content.subTitle)).toBeInTheDocument();
        expect(screen.getByText(content.body)).toBeInTheDocument();
        expect(screen.getByText(`Author: ${content.author}`)).toBeInTheDocument();
      });
    });
  });

  it('renders error message on fetch failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch content'));
    render(await Home());

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch content/i)).toBeInTheDocument();
    });
  });
});
