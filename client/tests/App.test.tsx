import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../src/App.tsx';

describe('App Component', () => {
  test('renders Logo component', () => {
    render(<App />);
    const logoElement = screen.getByText(/Baller Blitz/i);
    expect(logoElement).toBeTruthy();
  });
});
