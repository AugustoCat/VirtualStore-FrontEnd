import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderFilter from '../OrderFilter';

describe('OrderFilter Component', () => {
    test('renders input for filtering', () => {
        render(<OrderFilter onFilterChange={() => {}} />);
        
        const inputElement = screen.getByPlaceholderText(/digite o nome do produto/i);
        expect(inputElement).toBeTruthy(); 
        expect(inputElement.getAttribute('type')).toBe('text'); 
    });

    test('calls onFilterChange with the correct value when input changes', () => {
        const onFilterChangeMock = vi.fn(); 
        render(<OrderFilter onFilterChange={onFilterChangeMock} />);

        const inputElement = screen.getByPlaceholderText(/digite o nome do produto/i);
        fireEvent.change(inputElement, { target: { value: 'Produto A' } });

        expect(onFilterChangeMock).toHaveBeenCalledWith('Produto A');
    });

    test('input value updates correctly', () => {
        render(<OrderFilter onFilterChange={() => {}} />);

        const inputElement = screen.getByPlaceholderText(/digite o nome do produto/i);
        fireEvent.change(inputElement, { target: { value: 'Produto B' } });

        expect(inputElement.value).toBe('Produto B');
    });
});
