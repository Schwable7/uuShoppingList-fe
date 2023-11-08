import React, {useState} from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import {Link} from "react-router-dom";

function ShoppingListTile({shoppingList, isOwner, onDelete, onArchive, archived}) {
    const [openDialog, setOpenDialog] = useState(false);
    const handleArchive = () => {
        onArchive(shoppingList.id);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {
        onDelete(shoppingList.id);
        setOpenDialog(false);
    };

    return (
        <>
            <Card>
                <CardActionArea style={{minHeight: '150px'}}>
                    <Link to={`/shoppingList/${shoppingList.id}`} style={{textDecoration: 'black'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" style={{color: 'black'}}>
                                {shoppingList.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" style={{color: 'red'}}>
                                {shoppingList.archived ? 'Archived' : ""}
                            </Typography>
                        </CardContent>
                    </Link>
                    {isOwner && (
                        <IconButton onClick={handleOpenDialog} aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    )}
                    <IconButton onClick={handleArchive} aria-label="archive">
                        <ArchiveIcon/>
                    </IconButton>
                </CardActionArea>

            </Card>


            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this shopping list?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ShoppingListTile;
