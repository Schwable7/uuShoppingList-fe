import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import DialogActions from '@mui/material/DialogActions';

function CreateShoppingListModal({modalOpen, setModalOpen, setShopLists, shopLists, currentUser}) {
    const [newListTitle, setNewListTitle] = useState('');

    // Function to handle modal close
    const handleCloseCreateModal = () => {
        setModalOpen(false);
    };

    // Function to handle the creation of a new shopping list
    const handleCreateNewList = () => {
        console.log('Creating new list...');
        const newList = {
            id: Math.max(...shopLists.map(item => item.id), 0) + 1,
            title: newListTitle,
            owner: currentUser,
            archived: false,
            members: [currentUser],
            items: []
        };
        setShopLists(previousLists => {
            const updatedLists = [...previousLists, newList];
            console.log('Updated shopping lists: ', updatedLists); // Log to see if the list is being added
            return updatedLists;
        });
        setNewListTitle(''); // Reset the new list title
        setModalOpen(false); // Close the modal
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
            {/* Modal for creating a new shopping list */}
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
                    <FormControl fullWidth sx={{mt: 2}}>
                        <InputLabel htmlFor="shopping-list-title">Title</InputLabel>
                        <Input
                            id="shopping-list-title"
                            value={newListTitle}
                            onChange={(e) => setNewListTitle(e.target.value)}
                        />
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
