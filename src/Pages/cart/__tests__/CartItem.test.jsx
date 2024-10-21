import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShopContext } from '../../../context/ShopContext';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import CartItem from '../CartItem'; 

const mockContextValue = {
    cartItems: { 1: 2 }, 
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    updateCartItemCount: vi.fn(),
};

describe('CartItem Component', () => {
    const productData = {
        id: 1,
        productName: 'Test Product',
        price: 100,
        productImg: 'path/to/image.jpg',
    };

    test('renders cart item correctly', () => {
        render(
            <ShopContext.Provider value={mockContextValue}>
                <CartItem data={productData} />
            </ShopContext.Provider>
        );

        expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
        expect(screen.getByText(/100/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(2)).toBeInTheDocument();
    });

    test('calls removeFromCart when "-" button is clicked', () => {
        render(
            <ShopContext.Provider value={mockContextValue}>
                <CartItem data={productData} />
            </ShopContext.Provider>
        );

        fireEvent.click(screen.getByText('-'));
        expect(mockContextValue.removeFromCart).toHaveBeenCalledWith(1);
    });

    test('calls addToCart when "+" button is clicked', () => {
        render(
            <ShopContext.Provider value={mockContextValue}>
                <CartItem data={productData} />
            </ShopContext.Provider>
        );

        fireEvent.click(screen.getByText('+'));
        expect(mockContextValue.addToCart).toHaveBeenCalledWith(1);
    });

    test('calls updateCartItemCount when input value changes', () => {
        render(
            <ShopContext.Provider value={mockContextValue}>
                <CartItem data={productData} />
            </ShopContext.Provider>
        );

        fireEvent.change(screen.getByDisplayValue(2), { target: { value: '3' } });
        expect(mockContextValue.updateCartItemCount).toHaveBeenCalledWith(3, 1);
    });
});
