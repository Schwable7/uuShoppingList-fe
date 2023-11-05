import React from 'react';
import Grid from '@mui/material/Grid';
import ShoppingListTile from '../bricks/ShoppingListTile'; // Adjust the import path as necessary
import { useAuth } from "../context/UserAuthContext";

function ShoppingListsView({ shoppingLists }) {
    const { currentUser } = useAuth();

    const visibleShoppingLists = currentUser ? shoppingLists.filter(shoppingList =>
        shoppingList.members.some(member => member.id === currentUser.id)
    ) : [];

    if (!currentUser) {
        return <h2>You need to log in to see your shopping lists.</h2>;
    }

    return (
        <Grid container spacing={2}>
            {visibleShoppingLists.length > 0 ? (
                visibleShoppingLists.map((shoppingList) => (
                    <Grid item key={shoppingList.id} xs={12} sm={6} md={4}>
                        <ShoppingListTile shoppingList={shoppingList} />
                    </Grid>
                ))
            ) : (
                <h2>You are not a member of any shopping lists.</h2>
            )}
        </Grid>
    );
}

export default ShoppingListsView;
