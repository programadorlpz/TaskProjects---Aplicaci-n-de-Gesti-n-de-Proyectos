import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import App from './App';

test('renders TaskProjects title', () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  const titleElement = screen.getByText(/Gestión de Proyectos/i);
  expect(titleElement).toBeInTheDocument();
});
