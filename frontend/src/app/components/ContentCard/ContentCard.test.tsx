import React from 'react';
import { render } from '@testing-library/react';
import ContentCard from './ContentCard';

const mockContent = {
  id: '1',
  title: 'Test Title',
  subTitle: 'Test Subtitle',
  body: 'Test body text',
};

test('renders the content card with correct data', () => {
  const { getByText } = render(<ContentCard content={mockContent} />);
  expect(getByText(/Test Title/i)).toBeInTheDocument();
  expect(getByText(/Test Subtitle/i)).toBeInTheDocument();
  expect(getByText(/Test body text/i)).toBeInTheDocument();
});
