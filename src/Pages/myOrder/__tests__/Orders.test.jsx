import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Orders from '../Orders';

// Mock do localStorage
const mockOrders = [
  {
    id: 1,
    items: [
      { productId: 1, productName: 'Produto A', productImg: 'imgA.png', quantity: 2 },
      { productId: 2, productName: 'Produto B', productImg: 'imgB.png', quantity: 1 },
    ],
  },
  {
    id: 2,
    items: [
      { productId: 3, productName: 'Produto C', productImg: 'imgC.png', quantity: 1 },
    ],
  },
];

describe('Orders Component', () => {
  beforeEach(() => {
    Storage.prototype.getItem = vi.fn(() => JSON.stringify(mockOrders)); 
    render(<Orders />);
  });

  test('should display the title', () => {
    const title = screen.getByText(/pedidos anteriores/i);
    expect(title).toBeInTheDocument();
  });

  test('should display orders when there are orders', () => {
    const orderTitle1 = screen.getByText(/Pedido #1/i);
    const orderTitle2 = screen.getByText(/Pedido #2/i);
    expect(orderTitle1).toBeInTheDocument();
    expect(orderTitle2).toBeInTheDocument();

    const itemA = screen.getByText(/Produto A/i);
    const itemB = screen.getByText(/Produto B/i);
    const itemC = screen.getByText(/Produto C/i);
    expect(itemA).toBeInTheDocument();
    expect(itemB).toBeInTheDocument();
    expect(itemC).toBeInTheDocument();
  });

  test('should display a message when there are no previous orders', () => {
    Storage.prototype.getItem = vi.fn(() => JSON.stringify([])); 
    render(<Orders />);
    const message = screen.getByText(/você não tem pedidos anteriores/i);
    expect(message).toBeInTheDocument();
  });

  test('should filter orders based on input', () => {
    const filterInput = screen.getByPlaceholderText(/digite o nome do produto/i);
    fireEvent.change(filterInput, { target: { value: 'Produto A' } });

    // Verifica se apenas o Pedido #1 é exibido
    expect(screen.getByText(/Pedido #1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Pedido #2/i)).not.toBeInTheDocument();
  });
});
