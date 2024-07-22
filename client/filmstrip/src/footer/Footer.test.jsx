import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

test("DeleteAccount renders correctly", () => {
    render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
    const textElement = screen.getByText('TMDB');
    expect(textElement).toBeInTheDocument();
})