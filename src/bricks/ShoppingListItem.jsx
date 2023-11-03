import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'; // You may need to install @mui/material if you haven't already
import styles from "../css/shoppinglist.module.css";

function ShoppingListItem({ item, onToggle, onDelete }) {
    return (
        <div className={styles.item}>
            <li className={item.completed ? styles.completed : ''}>
                <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => onToggle(item.id)}
                />
                {item.text}
                <IconButton
                    onClick={() => onDelete(item.id)}
                    className={styles.deleteBtn}
                    aria-label="delete item"
                    size="small"
                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </li>

        </div>

    );
}

export default ShoppingListItem;
