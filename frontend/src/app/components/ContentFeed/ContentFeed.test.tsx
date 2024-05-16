import { render, screen } from '@testing-library/react';
import ContentFeed, { Content } from "./ContentFeed";

describe('ContentFeed', () => {
    it('renders without crashing', () => {
      render(<ContentFeed />);
    });
  
    it('displays "Loading..." when loading', () => {
      render(<ContentFeed />);
      const loadingElement = screen.getByText(/Loading.../i);
      expect(loadingElement).toBeInTheDocument();
    });
  
    it('displays error message when there is an error', () => {
      render(<ContentFeed />);
      const errorElement = screen.getByText(/Failed to fetch content/i);
      expect(errorElement).toBeInTheDocument();
    });
    const mockContent: Content[] = [
        {
          id: '1',
          title: 'Content 1',
          subTitle: 'Sub Title 1',
          body: 'This is the body of the first piece of content',
        },
        {
          id: '2',
          title: 'Content 2',
          subTitle: 'Sub Title 2',
          body: 'This is the body of the second piece of content',
        },
        // Add more content objects as needed
      ];
    it('renders ContentCard for each content', () => {
      render(<ContentFeed />);
      const contentCards = screen.getAllByTestId('content-card');
      expect(contentCards.length).toBe(mockContent.length);
    });
  });