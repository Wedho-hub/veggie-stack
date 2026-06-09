// lib/cartContext.tsx
// React Context is how we share cart state across the whole app
// without passing props through every component
'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import type { Product, CartItem } from '@/types'

// ── STATE SHAPE ──────────────────────────────────────────────
interface CartState {
  items: CartItem[]
  // TypeScript: derived values — computed from items
  totalItems: number
  totalPrice: number
}

// ── ACTIONS ──────────────────────────────────────────────────
// TypeScript discriminated union — each action has a unique 'type'
// This is the typed alternative to a big if/else chain
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }        // payload is product _id
  | { type: 'INCREMENT'; payload: string }           // payload is product _id
  | { type: 'DECREMENT'; payload: string }           // payload is product _id
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }       // for localStorage restore

// ── HELPERS ──────────────────────────────────────────────────
function calcTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  }
}

// ── REDUCER ──────────────────────────────────────────────────
// TypeScript: the reducer is fully typed — every case knows
// exactly what payload looks like
function cartReducer(state: CartState, action: CartAction): CartState {
  let updatedItems: CartItem[]

  switch (action.type) {

    case 'ADD_ITEM': {
      const exists = state.items.find(
        (item) => item.product._id === action.payload._id
      )
      if (exists) {
        // Already in cart — just increment quantity
        updatedItems = state.items.map((item) =>
          item.product._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // New item — add with quantity 1
        updatedItems = [...state.items, { product: action.payload, quantity: 1 }]
      }
      return { items: updatedItems, ...calcTotals(updatedItems) }
    }

    case 'REMOVE_ITEM': {
      updatedItems = state.items.filter(
        (item) => item.product._id !== action.payload
      )
      return { items: updatedItems, ...calcTotals(updatedItems) }
    }

    case 'INCREMENT': {
      updatedItems = state.items.map((item) =>
        item.product._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      return { items: updatedItems, ...calcTotals(updatedItems) }
    }

    case 'DECREMENT': {
      updatedItems = state.items
        .map((item) =>
          item.product._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        // Remove item if quantity drops to 0
        .filter((item) => item.quantity > 0)
      return { items: updatedItems, ...calcTotals(updatedItems) }
    }

    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 }

    case 'LOAD_CART':
      return { items: action.payload, ...calcTotals(action.payload) }

    default:
      return state
  }
}

// ── CONTEXT ──────────────────────────────────────────────────
// TypeScript: defining exactly what the context exposes
interface CartContextType {
  state: CartState
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  clearCart: () => void
}

// createContext needs a default — we use null and handle it below
const CartContext = createContext<CartContextType | null>(null)

// ── PROVIDER ─────────────────────────────────────────────────
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  })

  // Load cart from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem('veggie-stack-cart')
    if (stored) {
      try {
        const parsed: CartItem[] = JSON.parse(stored)
        dispatch({ type: 'LOAD_CART', payload: parsed })
      } catch {
        // Corrupted data — ignore it
        localStorage.removeItem('veggie-stack-cart')
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('veggie-stack-cart', JSON.stringify(state.items))
  }, [state.items])

  // Clean action functions — components call these, not dispatch directly
  const addItem = (product: Product) =>
    dispatch({ type: 'ADD_ITEM', payload: product })

  const removeItem = (id: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: id })

  const increment = (id: string) =>
    dispatch({ type: 'INCREMENT', payload: id })

  const decrement = (id: string) =>
    dispatch({ type: 'DECREMENT', payload: id })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, increment, decrement, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ── CUSTOM HOOK ───────────────────────────────────────────────
// TypeScript: this hook guarantees context is never null
// If you use useCart() outside CartProvider, you get a clear error
export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>')
  }
  return context
}