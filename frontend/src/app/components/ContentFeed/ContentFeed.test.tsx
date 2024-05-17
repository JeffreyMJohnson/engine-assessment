import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ContentFeed from './ContentFeed';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockContent = [
  {
    id: '1',
    title: 'Test Title 1',
    subTitle: 'Test Subtitle 1',
    body: 'Test body content 1',
  },
  {
    id: '2',
    title: 'Test Title 2',
    subTitle: 'Test Subtitle 2',
    body: 'Test body content 2',
  },
];

describe('ContentFeed', () => {
  it('renders loading state initially', async () => {
    render(<ContentFeed />);
    await waitFor(() => expect(screen.getByText(/Loading.../i)).toBeInTheDocument());
  });

  it('renders content cards after fetching data', async () => {
    await act(async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockContent });
      render(<ContentFeed />);
    });

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    mockContent.forEach(content => {
      expect(screen.getByText(content.title)).toBeInTheDocument();
      expect(screen.getByText(content.subTitle)).toBeInTheDocument();
      expect(screen.getByText(content.body)).toBeInTheDocument();
    });
  });

  it('renders error message on fetch failure', async () => {
    await act(async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
      render(<ContentFeed />);
    });

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    expect(screen.getByText(/Failed to fetch content/i)).toBeInTheDocument();
  });
});
