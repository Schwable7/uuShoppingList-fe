import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialShoppingLists } from '../data';
const ShoppingListsContext = createContext(null);

export function useShoppingListsCtx() {
    return useContext(ShoppingListsContext);
}

export function ShoppingListsProvider({ children }) {
    const [shoppingLists, setShoppingLists] = useState(initialShoppingLists);

    const value = {
        shoppingLists,
        setShoppingLists
    };

    return (
        <ShoppingListsContext.Provider value={value}>
            {children}
        </ShoppingListsContext.Provider>
    );
}
