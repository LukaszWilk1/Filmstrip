import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from './Home';

test("Home renders correctly", () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
      );
    const textElement = screen.getByText('TRENDING MOVIES');
    expect(textElement).toBeInTheDocument();
})