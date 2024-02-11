import { screen, render } from '@testing-library/react';

import Logo from '../src/components/pages/HomePage/Logo/Logo.tsx';

test('Logo component renders correctly with size', () => {
  render(<Logo />);
  const logoElement = screen.getByText('NBA Battle');
  expect(logoElement).toBeTruthy();
});
