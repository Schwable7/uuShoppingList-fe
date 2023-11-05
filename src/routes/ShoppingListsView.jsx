import React from 'react';
import Grid from '@mui/material/Grid';
import ShoppingListTile from '../bricks/ShoppingListTile'; // Adjust the import path as necessary
import {useAuth} from "../context/UserAuthContext";

function ShoppingListsView({ shoppingLists }) {
    const {currentUser} = useAuth();
    const visibleShoppingLists = currentUser ? shoppingLists.filter(shoppingList =>
        shoppingList.members.some(member => member.id === currentUser.id)
    ) : []
    return (
        <Grid container spacing={2}>
            {visibleShoppingLists.map((shoppingList) => (
                <Grid item key={shoppingList.id} xs={12} sm={6} md={4}>
                    <ShoppingListTile shoppingList={shoppingList} />
                </Grid>
            ))}
        </Grid>
    );
}

export default ShoppingListsView;
