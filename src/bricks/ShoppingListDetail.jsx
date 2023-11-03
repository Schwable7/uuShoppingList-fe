import React, { useState } from 'react';
import ShoppingListItem from './ShoppingListItem'; // Adjust the import path as necessary

function ShoppingListDetail() {
    const initialState = [
        { id: 1, text: 'Milk', completed: false },
        { id: 2, text: 'Bread', completed: false },
        { id: 3, text: 'Eggs', completed: false },
    ];
    const [items, setItems] = useState(initialState);
    const [newItem, setNewItem] = useState('');
    const [showCompleted, setShowCompleted] = useState(true);

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            const newItemObject = {
                id: Math.max(...items.map(item => item.id), 0) + 1,
                text: newItem,
                completed: false,
            };
            setItems([...items, newItemObject]);
            setNewItem('');
        }
    };

    const handleItemChange = (id) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setItems(updatedItems);
    };

    const handleDeleteItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    const toggleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };

    const filteredItems = showCompleted ? items : items.filter(item => !item.completed);

    const title = "Shopping List";
    return (
        <div>
            <h1>{title}</h1>

                <button onClick={toggleShowCompleted}>
                    {showCompleted ? 'Hide' : 'Show'} Completed
                </button>
            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                    placeholder="Add new item"
                />
                <button onClick={handleAddItem}>Add</button>
            </div>

            <ul>
                {filteredItems.map((item) => (
                    <ShoppingListItem
                        key={item.id}
                        item={item}
                        onToggle={handleItemChange}
                        onDelete={handleDeleteItem}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ShoppingListDetail;
