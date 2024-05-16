import { render } from '@testing-library/react';
import Header from './Header';

test('renders the header with correct text', () => {
  const { getByText } = render(<Header />);
  const headerElement = getByText(/Content Feed/i);
  expect(headerElement).toBeInTheDocument();
});
