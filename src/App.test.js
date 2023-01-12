import { render, screen } from '@testing-library/react';
import App from './App';
import AuthProvider from './providers/Auth';

test('renders learn react link', () => {
  render(<AuthProvider> <App /> </AuthProvider>);
  screen.debug();
  // screen.queryAllByAltText('');
  
});
