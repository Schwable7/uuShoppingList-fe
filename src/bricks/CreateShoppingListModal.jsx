import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import DialogActions from '@mui/material/DialogActions';
import {useNotification} from "../context/NotificationContext";

function CreateShoppingListModal({ modalOpen, setModalOpen, setShopLists, shopLists, currentUser }) {
    const [newListTitle, setNewListTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    const showNotification = useNotification();
    // Function to validate title
    const validateTitle = (title) => {
        return title.length >= 2;
    };

    // Function to handle modal close
    const handleCloseCreateModal = () => {
        setModalOpen(false);
        setTitleError(false); // Reset error state when closing modal
    };

    // Function to handle the creation of a new shopping list
    const handleCreateNewList = () => {
        if (validateTitle(newListTitle)) {
            const newList = {
                id: Math.max(...shopLists.map(item => item.id), 0) + 1,
                title: newListTitle,
                owner: currentUser,
                archived: false,
                members: [currentUser],
                items: []
            }

            fetch(`http://localhost:8000/shoppingLists`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newList)
            })
                .then(response => response.json())
                .then(data => {
                    setShopLists(previousLists => [...previousLists, data]);
                    setNewListTitle('');
                    setTitleError(false);
                    setModalOpen(false);
                    showNotification('success', 'Shopping list created successfully');
                })
                .catch(error => {
                    console.error('Error creating shopping list:', error);
                    showNotification('error', 'Error creating shopping list');
                });
        } else {
            setTitleError(true);
        }
    };
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none' // Removes the focus outline from the modal
    };

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={handleCloseCreateModal}
                aria-labelledby="create-shopping-list-modal"
                aria-describedby="create-shopping-list-form"
            >
                <Box sx={modalStyle}>
                    <Typography id="create-shopping-list-modal" variant="h6" component="h2">
                        Create New Shopping List
                    </Typography>
                    <FormControl fullWidth sx={{ mt: 2 }} error={titleError}>
                        <InputLabel htmlFor="shopping-list-title">Title</InputLabel>
                        <Input
                            id="shopping-list-title"
                            value={newListTitle}
                            onChange={(e) => setNewListTitle(e.target.value)}
                        />
                        {titleError && <FormHelperText>Title must be at least 2 characters long</FormHelperText>}
                    </FormControl>
                    <DialogActions>
                        <Button onClick={handleCloseCreateModal}>Cancel</Button>
                        <Button onClick={handleCreateNewList}>Create</Button>
                    </DialogActions>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateShoppingListModal;