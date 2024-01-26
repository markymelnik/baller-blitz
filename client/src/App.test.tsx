import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App.tsx';

describe('App Component', () => {
  test('renders Logo component', () => {
    render(<App />);
    const logoElement = screen.getByText(/NBA Battle/i);
    expect(logoElement).toBeTruthy();
  });
});
