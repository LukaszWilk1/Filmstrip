import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Register from './Register';

test("Register renders correctly", () => {
    render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
    const textElement = screen.getByText('Register');
    expect(textElement).toBeInTheDocument();
})