import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import ShoppingListTile from '../bricks/ShoppingListTile';
import {useAuth} from "../context/UserAuthContext";
import {Button} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from "@mui/icons-material/Add";
import CreateShoppingListModal from "../bricks/CreateShoppingListModal";

function ShoppingListsView({shoppingLists}) {
    const [shopLists, setShopLists] = useState(shoppingLists);
    const [showArchived, setShowArchived] = useState(true);
    const [isCreateModalOpen, setModalOpen] = useState(false);
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

            <CreateShoppingListModal currentUser={currentUser} setShopLists={setShopLists} shopLists={shopLists}
                                     setModalOpen={setModalOpen} modalOpen={isCreateModalOpen}/>
        </>
    );
}

export default ShoppingListsView;
