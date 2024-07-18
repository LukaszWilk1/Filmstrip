import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from './Login';

test("Login renders correctly", () => {
    render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
    const textElement = screen.getByText('FILMSTRIP');
    expect(textElement).toBeInTheDocument();
})