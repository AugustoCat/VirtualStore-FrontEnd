import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { ShopContext } from '../../../context/ShopContext';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

import Cart from '../Cart';

const mockContextValue = {
    cartItems: { 1: 1, 2: 0 }, // Example cart items
    getTotalCartAmount: () => 100,
    finalizeOrder: vi.fn(),
};

describe('Cart Component', () => {
    test('renders cart items and total amount', () => {
        render(
            <MemoryRouter>
                <ShopContext.Provider value={mockContextValue}>
                    <Cart />
                </ShopContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(/seu carrinho/i)).toBeInTheDocument();
        expect(screen.getByText(/total:/i)).toBeInTheDocument();
        expect(screen.getByText(/r\$ 100/i)).toBeInTheDocument(); // Check total
    });

    test('finalizes order when button is clicked', () => {
        window.confirm = vi.fn(() => true); // Simulate confirmation
        render(
            <MemoryRouter>
                <ShopContext.Provider value={mockContextValue}>
                    <Cart />
                </ShopContext.Provider>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/finalizar pedido/i));
        expect(mockContextValue.finalizeOrder).toHaveBeenCalled();
    });
});
