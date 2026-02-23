import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // User Management
  const registerUser = useCallback((userData) => {
    // Basic validation
    if (!userData.email || !userData.fullName) {
      throw new Error('Email and Full Name are required');
    }
    
    if (users.some(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    setUsers(prev => [...prev, newUser]);
    return newUser;
  }, [users]);

  // Product Management
  const registerProduct = useCallback((productData) => {
    if (!productData.sku || !productData.name || productData.price === undefined || productData.quantity === undefined) {
      throw new Error('SKU, Name, Price, and Quantity are required');
    }

    if (products.some(p => p.sku === productData.sku)) {
      throw new Error('Product with this SKU already exists');
    }

    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      price: parseFloat(productData.price),
      quantity: parseInt(productData.quantity, 10),
      lastUpdated: new Date().toISOString(),
    };

    setProducts(prev => [...prev, newProduct]);
    
    // Initial transaction
    addTransaction({
      type: 'INITIAL_STOCK',
      sku: newProduct.sku,
      amount: newProduct.quantity,
      timestamp: newProduct.lastUpdated,
      note: 'Initial registration'
    });

    return newProduct;
  }, [products]);

  // Stock Adjustment
  const adjustStock = useCallback((sku, amount, userId = 'System') => {
    setProducts(prev => {
      const productIndex = prev.findIndex(p => p.sku === sku);
      if (productIndex === -1) throw new Error('Product not found');

      const product = prev[productIndex];
      const newQuantity = product.quantity + amount;

      if (newQuantity < 0) {
        throw new Error('Stock cannot go negative');
      }

      const updatedProduct = {
        ...product,
        quantity: newQuantity,
        lastUpdated: new Date().toISOString(),
      };

      const newProducts = [...prev];
      newProducts[productIndex] = updatedProduct;

      // Log transaction
      addTransaction({
        type: amount > 0 ? 'STOCK_IN' : 'STOCK_OUT',
        sku: sku,
        amount: Math.abs(amount),
        timestamp: updatedProduct.lastUpdated,
        userId: userId,
        previousQuantity: product.quantity,
        newQuantity: newQuantity
      });

      return newProducts;
    });
  }, []);

  // Transaction History
  const addTransaction = useCallback((transaction) => {
    setTransactions(prev => [
      {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...transaction
      },
      ...prev
    ]);
  }, []);

  const value = useMemo(() => ({
    users,
    products,
    transactions,
    registerUser,
    registerProduct,
    adjustStock,
  }), [users, products, transactions, registerUser, registerProduct, adjustStock]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
