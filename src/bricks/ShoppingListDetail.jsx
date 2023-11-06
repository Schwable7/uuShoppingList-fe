import React, {useState} from 'react';
import ShoppingListItem from './ShoppingListItem';
import MembersModal from "./MembersModal"; // Adjust the import path as necessary
import {useAuth} from "../context/UserAuthContext";
import styles from "../css/shoppinglist.module.css";

function ShoppingListDetail({shoppingList}) {

    const {currentUser, users} = useAuth();

    const [items, setItems] = useState(shoppingList.items);
    const [newItem, setNewItem] = useState('');
    const [showCompleted, setShowCompleted] = useState(true);
    const [title, setTitle] = useState(shoppingList.title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [members, setMembers] = useState(shoppingList.members);
    const [newMember, setNewMember] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [owner, setOwner] = useState(shoppingList.owner); // Assuming Mike is the owner

    const isUserAuthorized = (currentUser, owner, members) => {
        return currentUser && (currentUser.id === owner.id || members.some(member => member.id === currentUser.id));
    };

    const handleTitleClick = () => {
        if (currentUser.id === owner.id) { // Check if the current user is the owner
            setIsEditingTitle(true);
        } else {
            alert('Only the owner can edit the shopping list title.'); // Inform non-owners
        }
    };
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTitleKeyDown = (event) => {
        // Save the title on Enter key and cancel editing on Escape key
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault();
            setIsEditingTitle(false);
            if (event.key === 'Enter') {
                setTitle(event.target.value);
            }
        }
    };
    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            const newItemObject = {
                id: Math.max(...items.map(item => item.id), 0) + 1,
                text: newItem,
                completed: false,
            };
            setItems([...items, newItemObject]);
            setNewItem('');
        }
    };

    const handleItemChange = (id) => {
        const updatedItems = items.map((item) =>
            item.id === id ? {...item, completed: !item.completed} : item
        );
        setItems(updatedItems);
    };

    const handleDeleteItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    const toggleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };

    const filteredItems = showCompleted ? items : items.filter(item => !item.completed);

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    };

    const authorized = isUserAuthorized(currentUser, owner, members);

    return (

        <div>
            {authorized ? (
                // Render the shopping list if the user is authorized
                <>
                    <div className={styles.container}>
                        {isEditingTitle ? (
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                onKeyDown={handleTitleKeyDown}
                                onBlur={handleTitleBlur}
                                autoFocus
                            />
                        ) : (
                            <h1 onClick={handleTitleClick}
                                style={{cursor: currentUser.id === owner.id ? 'pointer' : 'not-allowed'}}>
                                {title}
                            </h1>
                        )}

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                             className={styles.container}>
                            <button onClick={toggleShowCompleted}>
                                {showCompleted ? 'Hide' : 'Show'} Completed
                            </button>
                            <button onClick={handleOpenModal}>Members</button>
                        </div>
                        <div className={styles.container}>
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                                placeholder="Add new item"
                            />
                            <button onClick={handleAddItem}>Add</button>
                        </div>

                        <MembersModal
                            users={users}
                            members={members}
                            setMembers={setMembers}
                            newMember={newMember}
                            setNewMember={setNewMember}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            owner={owner}
                            currentUser={currentUser}
                        />

                        <ul className={styles.container}>
                            {filteredItems.map((item) => (
                                <ShoppingListItem
                                    key={item.id}
                                    item={item}
                                    onToggle={handleItemChange}
                                    onDelete={handleDeleteItem}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                // Display a message if the user is not authorized
                <h1>You are not authorized or logged in to see this shopping list.</h1>
            )}
        </div>

    );
}

export default ShoppingListDetail;
