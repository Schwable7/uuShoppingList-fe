import React, {useEffect, useState} from "react";
import ShoppingListDetail from "../bricks/ShoppingListDetail";
import {useParams} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function ShoppingList() {
    let { id } = useParams();
    const [selectedShoppingList, setSelectedShoppingList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const shoppingListId = parseInt(id, 10); // Convert the id to a number
        setIsLoading(true);

        fetch(`http://localhost:8000/shoppingLists/${shoppingListId}`)
            .then(response => response.json())
            .then(data => {
                setSelectedShoppingList(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching shopping list:', error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            {selectedShoppingList ? (
                <ShoppingListDetail shoppingList={selectedShoppingList} />
            ) : (
                <h3>Shopping list not found</h3>
            )}
        </>
    );
}

export default ShoppingList;
