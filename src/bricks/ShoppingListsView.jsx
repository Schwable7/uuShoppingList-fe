import React from 'react';
import Grid from '@mui/material/Grid';
import ShoppingListTile from './ShoppingListTile'; // Adjust the import path as necessary

function ShoppingListsView({ shoppingLists }) {
    return (
        <Grid container spacing={2}>
            {shoppingLists.map((shoppingList) => (
                <Grid item key={shoppingList.id} xs={12} sm={6} md={4}>
                    <ShoppingListTile shoppingList={shoppingList} />
                </Grid>
            ))}
        </Grid>
    );
}

export default ShoppingListsView;
