import React from 'react';
import { render } from '@testing-library/react';
import AppTitle from './AppTitle';

test('renders weath+app', () => {
  const { getByText } = render(<AppTitle />);
  const weath = getByText(/weath/i);
  expect(weath).toBeInTheDocument();
  const app = getByText(/app/i);
  expect(app).toBeInTheDocument();
});
