import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import DeleteAccount from './DeleteAccount';

test("DeleteAccount renders correctly", () => {
    render(
        <MemoryRouter>
          <DeleteAccount />
        </MemoryRouter>
      );
    const textElement = screen.getByText('Enter password to delete account');
    expect(textElement).toBeInTheDocument();
})