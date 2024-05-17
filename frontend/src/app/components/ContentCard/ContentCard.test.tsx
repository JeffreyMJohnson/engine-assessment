import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentCard, { ContentCardProps } from './ContentCard';

const mockContent: ContentCardProps['content'] = {
  id: '1',
  title: 'Test Title',
  subTitle: 'Test Subtitle',
  body: 'Test body content',
  author: 'John Doe',
  imageUri: 'https://example.com/image.jpg',
  comments: [
    {
      text: 'Test comment',
      author: 'Commenter',
      profilePic: 'https://example.com/profile.jpg',
      likes: 5
    }
  ]
};

describe('ContentCard', () => {
  it('renders the content card with correct title', () => {
    render(<ContentCard content={mockContent} />);
    const titleElement = screen.getByText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the content card with correct subtitle', () => {
    render(<ContentCard content={mockContent} />);
    const subTitleElement = screen.getByText(/Test Subtitle/i);
    expect(subTitleElement).toBeInTheDocument();
  });

  it('renders the content card with correct body', () => {
    render(<ContentCard content={mockContent} />);
    const bodyElement = screen.getByText(/Test body content/i);
    expect(bodyElement).toBeInTheDocument();
  });

  it('renders the content card with correct author', () => {
    render(<ContentCard content={mockContent} />);
    const authorElement = screen.getByText(/Author: John Doe/i);
    expect(authorElement).toBeInTheDocument();
  });

  it('renders the content card with correct comments', () => {
    render(<ContentCard content={mockContent} />);
    const commentTextElement = screen.getByText(/Test comment/i);
    const commentAuthorElement = screen.getByText(/@Commenter/i);
    const commentLikesElement = screen.getByText(/Likes: 5/i);
    expect(commentTextElement).toBeInTheDocument();
    expect(commentAuthorElement).toBeInTheDocument();
    expect(commentLikesElement).toBeInTheDocument();
  });

  it('applies the correct CSS class', () => {
    render(<ContentCard content={mockContent} />);
    const cardElement = screen.getByTestId('content-card');
    expect(cardElement).toHaveClass('content-card');
  });
});
