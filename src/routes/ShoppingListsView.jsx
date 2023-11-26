import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import ShoppingListTile from '../bricks/ShoppingListTile';
import {useAuth} from "../context/UserAuthContext";
import {useShoppingListsCtx} from "../context/ShoppingListContext";
import {Button} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from "@mui/icons-material/Add";
import CreateShoppingListModal from "../bricks/CreateShoppingListModal";
import { useNotification} from "../context/NotificationContext";

function ShoppingListsView() {
    const [showArchived, setShowArchived] = useState(true);
    const [isCreateModalOpen, setModalOpen] = useState(false);
    const {currentUser} = useAuth();
    const {shoppingLists, setShoppingLists} = useShoppingListsCtx();
    const showNotification = useNotification();

    const handleArchive = (id) => {
        const updatedShoppingLists = shoppingLists.map(list => {
            if (list.id === id) {
                return {
                    ...list,
                    archived: !list.archived,
                };
            }
            return list;
        });
        setShoppingLists(updatedShoppingLists);
    };

    const toggleArchivedVisibility = () => {
        setShowArchived(!showArchived);
    };

    const visibleShoppingLists = currentUser ? shoppingLists.filter(shoppingList =>
        shoppingList.members.some(member => member.id === currentUser.id) && (showArchived || !shoppingList.archived)
    ) : [];


    const handleDelete = (id) => {
        const updatedShoppingLists = shoppingLists.filter(shoppingList => shoppingList.id !== id);
        setShoppingLists(updatedShoppingLists);
        showNotification('success', 'Shopping list deleted successfully');
    };

    const handleOpenCreateModal = () => {
        setModalOpen(true);
    };

    if (!currentUser) {
        return <h2>You need to log in to see your shopping lists.</h2>;
    }

    return (
        <>
            <Button startIcon={<VisibilityOffIcon/>} onClick={toggleArchivedVisibility}>
                {showArchived ? 'Hide' : 'Show'} Archived
            </Button>
            <Button startIcon={<AddIcon/>} onClick={handleOpenCreateModal}>
                Create Shopping List
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

            <CreateShoppingListModal currentUser={currentUser} setShopLists={setShoppingLists} shopLists={shoppingLists}
                                     setModalOpen={setModalOpen} modalOpen={isCreateModalOpen}/>
        </>
    );
}

export default ShoppingListsView;
