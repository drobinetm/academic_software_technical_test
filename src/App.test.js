import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login entry point', () => {
  render(<App />);
  expect(screen.getByText(/iniciar sesion/i)).toBeInTheDocument();
});
