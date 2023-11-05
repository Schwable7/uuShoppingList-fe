import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../css/shoppinglist.module.css";

function Member({member, isOwner, handleDeleteMember, currentUser}) {
    return (
        <ListItem className={styles.item}>
            <ListItemText primary={member.name}/>
            {(isOwner || currentUser.id === member.id) && (
                <IconButton
                    onClick={() => handleDeleteMember(member)}
                    className={styles.deleteBtn}
                    aria-label="delete member"
                    size="small"
                >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            )}
        </ListItem>
    );
}

export default Member;
