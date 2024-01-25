import { screen, render } from '@testing-library/react';

import Logo from './Logo.tsx';
import './logo.scss';

test('Logo component renders correctly with size', () => {
  render(<Logo />);
  const logoElement = screen.getByText('NBA Battle');
  expect(logoElement).toBeTruthy();
});
