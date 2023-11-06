import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

function ShoppingListTile({ shoppingList, isOwner, onDelete }) {
    const [openDialog, setOpenDialog] = useState(false);

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
                    <CardActionArea>
                        <Link to={`/shoppingList/${shoppingList.id}`} style={{ textDecoration: 'black' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" style={{ color: 'black' }}>
                                {shoppingList.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {shoppingList.description}
                            </Typography>
                        </CardContent>
                        </Link>
                        {isOwner && (
                            <IconButton onClick={handleOpenDialog} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        )}
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
