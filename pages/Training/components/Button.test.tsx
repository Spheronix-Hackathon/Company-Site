import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';
import { MemoryRouter } from 'react-router-dom';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <Button>Click Me</Button>
      </MemoryRouter>
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });



  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Button onClick={handleClick}>Clickable</Button>
      </MemoryRouter>
    );
    const btn = screen.getByRole('button', { name: /Clickable/i });
    btn.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
