import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import styles from "../css/shoppinglist.module.css";
import Member from "./Member";


function MembersModal({users, members, handleAddMember, handleDeleteMember, modalOpen, setModalOpen, owner, currentUser}) {
    const [selectedUser, setSelectedUser] = useState('');

    const isOwner = currentUser.id === owner.id;
    const addMember = () => {
        if (selectedUser) {
            handleAddMember(selectedUser);
            setSelectedUser('');
        }
    };

    const removeMember = (memberToDelete) => {
        handleDeleteMember(memberToDelete);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSelectChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const possibleMembers = users.filter(user => !members.some(member => member.id === user.id));

    return (
        <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="members-modal-title"
            aria-describedby="members-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                width: 'auto',
                maxWidth: '80%',
            }}>
                <h2 className={styles.item} id="members-modal-title">Shopping List Members</h2>
                <List dense>
                    {members.map((member, index) => (
                        <Member
                            key={index}
                            member={member}
                            owner={owner}
                            isOwner={isOwner}
                            handleDeleteMember={removeMember}
                            currentUser={currentUser}
                        />
                    ))}
                </List>
                {isOwner && (
                    <div className={styles.item}>
                        <FormControl fullWidth>
                            <InputLabel id="select-user-label">Add Member</InputLabel>
                            <Select
                                labelId="select-user-label"
                                id="select-user"
                                value={selectedUser}
                                label="Add Member"
                                onChange={handleSelectChange}
                            >
                                {possibleMembers.map((user) => (
                                    <MenuItem key={user.id} value={user}>{user.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton
                            onClick={addMember}
                            aria-label="add member"
                            size="small"
                            className={styles.deleteBtn}
                        >
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    </div>
                )}
            </Box>
        </Modal>
    );
}

export default MembersModal;
