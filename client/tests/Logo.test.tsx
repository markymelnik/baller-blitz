import { screen, render } from '@testing-library/react';

import { Logo } from '../src/components/top/Logo/Logo.tsx';

test('Logo component renders correctly with size', () => {
  render(<Logo />);
  const logoElement = screen.getByText('Baller Blitz');
  expect(logoElement).toBeTruthy();
});
