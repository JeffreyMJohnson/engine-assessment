import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ContentFeed from './ContentFeed';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('ContentFeed', () => {
  it('renders content feed with fetched data', async () => {
    // Arrange
    const mockData = [
      { id: '1', title: 'Title 1', subTitle: 'Subtitle 1', body: 'Body text 1' },
      { id: '2', title: 'Title 2', subTitle: 'Subtitle 2', body: 'Body text 2' },
    ];

    mock.onGet('/api/content').reply(200, mockData);

    // Act
    const { getByText } = render(<ContentFeed />);

    // Assert
    await waitFor(() => {
      mockData.forEach((content) => {
        expect(getByText(content.title)).toBeInTheDocument();
        expect(getByText(content.subTitle)).toBeInTheDocument();
        expect(getByText(content.body)).toBeInTheDocument();
      });
    });
  });

  it('renders loading state initially', () => {
    // Act
    const { getByText } = render(<ContentFeed />);

    // Assert
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    // Arrange
    mock.onGet('/api/content').reply(500);

    // Act
    const { getByText } = render(<ContentFeed />);

    // Assert
    await waitFor(() => {
      expect(getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });
});
