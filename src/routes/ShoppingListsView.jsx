import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import ShoppingListTile from '../bricks/ShoppingListTile';
import {useAuth} from "../context/UserAuthContext";
import {Button} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function ShoppingListsView({shoppingLists, onDeleteShoppingList}) {
    const [shopLists, setShopLists] = useState(shoppingLists);
    const [showArchived, setShowArchived] = useState(true);
    const {currentUser} = useAuth();

    const handleArchive = (id) => {
        const updatedShoppingLists = shopLists.map(list => {
            if (list.id === id) {
                return {
                    ...list,
                    archived: !list.archived,
                };
            }
            return list;
        });
        setShopLists(updatedShoppingLists);
    };

    const toggleArchivedVisibility = () => {
        setShowArchived(!showArchived);
    };

    const visibleShoppingLists = currentUser ? shopLists.filter(shoppingList =>
        shoppingList.members.some(member => member.id === currentUser.id) && (showArchived || !shoppingList.archived)
    ) : [];


    const handleDelete = (id) => {
        const updatedShoppingLists = shopLists.filter(shoppingList => shoppingList.id !== id);
        setShopLists(updatedShoppingLists);
    };

    if (!currentUser) {
        return <h2>You need to log in to see your shopping lists.</h2>;
    }

    return (
        <>
            <Button startIcon={<VisibilityOffIcon/>} onClick={toggleArchivedVisibility}>
                {showArchived ? 'Hide' : 'Show'} Archived
            </Button>
            <Grid container spacing={2}>
                {visibleShoppingLists.length > 0 ? (
                    visibleShoppingLists.map((shoppingList) => (
                        <Grid item key={shoppingList.id} xs={12} sm={6} md={4}>
                            <ShoppingListTile
                                shoppingList={shoppingList}
                                isOwner={shoppingList.owner.id === currentUser.id}
                                onDelete={handleDelete}
                                onArchive={handleArchive}
                                archived={shoppingList.archived}
                            />
                        </Grid>
                    ))
                ) : (
                    <h2>You are not a member of any shopping lists.</h2>
                )}
            </Grid>
        </>
    );
}

export default ShoppingListsView;
