import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import ShoppingListTile from '../bricks/ShoppingListTile';
import {useAuth} from "../context/UserAuthContext";
import {Button, CircularProgress} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from "@mui/icons-material/Add";
import CreateShoppingListModal from "../bricks/CreateShoppingListModal";
import { useNotification} from "../context/NotificationContext";
import {BASE_URL} from "../constants";

function ShoppingListsView() {
    const [showArchived, setShowArchived] = useState(true);
    const [isCreateModalOpen, setModalOpen] = useState(false);
    const [shoppingLists, setShoppingLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleShoppingLists, setVisibleShoppingLists] = useState([]);
    const {currentUser} = useAuth();
    const showNotification = useNotification();


    useEffect(() => {
        if (currentUser) {
            setIsLoading(true); // Start loading
            fetch(`${BASE_URL}/shoppingLists`)
                .then(response => response.json())
                .then(data => {
                    setShoppingLists(data);
                    setIsLoading(false); // Stop loading after data is fetched
                })
                .catch(error => {
                    console.error('Error fetching shopping lists:', error);
                    setIsLoading(false); // Stop loading in case of error
                });
        }
    }, [currentUser]);

    useEffect(() => {
        // Update visible shopping lists whenever shoppingLists, currentUser, or showArchived changes
        const filteredLists = shoppingLists.filter(shoppingList =>
            shoppingList.members.some(member => member.id === currentUser.id) && (showArchived || !shoppingList.archived)
        );
        setVisibleShoppingLists(filteredLists);
    }, [shoppingLists, currentUser, showArchived]);

    const handleArchive = (id) => {
        // Find the shopping list to be archived
        const shoppingListToUpdate = shoppingLists.find(list => list.id === id);
        if (!shoppingListToUpdate) {
            console.error('Shopping list not found');
            return;
        }

        // Update the 'archived' field
        const updatedShoppingList = {
            ...shoppingListToUpdate,
            archived: !shoppingListToUpdate.archived
        };

        // Send the updated shopping list to the server
        fetch(`${BASE_URL}/shoppingLists/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedShoppingList)
        })
            .then(response => {
                if (response.ok) {
                    // Update the local state with the new shopping list
                    setShoppingLists(shoppingLists.map(list =>
                        list.id === id ? updatedShoppingList : list
                    ));
                    showNotification('success', 'Shopping list updated successfully');
                }
            })
            .catch(error => console.error('Error updating shopping list:', error));
    };


    const toggleArchivedVisibility = () => {
        setShowArchived(!showArchived);
    };



    const handleDelete = (id) => {
        fetch(`${BASE_URL}/shoppingLists/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setShoppingLists(shoppingLists.filter(list => list.id !== id));
                    showNotification('success', 'Shopping list deleted successfully');
                }
            })
            .catch(error => console.error('Error deleting shopping list:', error));
    };

    const handleOpenCreateModal = () => {
        setModalOpen(true);
    };

    if (!currentUser) {
        return <h2>You need to log in to see your shopping lists.</h2>;
    }

    return (
        <>
            <Button startIcon={<VisibilityOffIcon />} onClick={toggleArchivedVisibility}>
                {showArchived ? 'Hide' : 'Show'} Archived
            </Button>
            <Button startIcon={<AddIcon />} onClick={handleOpenCreateModal}>
                Create Shopping List
            </Button>
            {isLoading ? (
                <CircularProgress />
            ) : (
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
            )}

            <CreateShoppingListModal currentUser={currentUser} setShopLists={setShoppingLists} shopLists={shoppingLists}
                                     setModalOpen={setModalOpen} modalOpen={isCreateModalOpen}/>
        </>
    );
}

export default ShoppingListsView;
