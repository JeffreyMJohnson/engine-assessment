import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentFeed, { Content } from './ContentFeed';

describe('ContentFeed', () => {
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

  it('renders content cards with provided data', () => {
    render(<ContentFeed contentData={mockContent} />);

    mockContent.forEach(content => {
      expect(screen.getByText(content.title)).toBeInTheDocument();
      expect(screen.getByText(content.subTitle)).toBeInTheDocument();
      expect(screen.getByText(content.body)).toBeInTheDocument();
      expect(screen.getByText(`Author: ${content.author}`)).toBeInTheDocument();
    });
  });

  it('renders error message when provided', () => {
    const errorMessage = 'Failed to fetch content';
    render(<ContentFeed contentData={[]} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders no content cards when contentData is empty', () => {
    render(<ContentFeed contentData={[]} />);

    expect(screen.queryByTestId('content-card')).toBeNull();
  });

  it('does not render error message when error is not provided', () => {
    render(<ContentFeed contentData={mockContent} />);

    expect(screen.queryByText('Failed to fetch content')).toBeNull();
  });
});
