import './App.css';
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Offcanvas, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import { useAuth } from './context/UserAuthContext';
import { useNotification } from './context/NotificationContext';

function App() {
    let navigate = useNavigate();
    const { currentUser, login, users, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const showNotification = useNotification();

    const handleLogin = (user) => {
        login(user);
        setShowLoginModal(false);
        showNotification('success', `Logged in as ${user.name}`);
    };

    return (
        <div className="App">
            <Navbar
                fixed="top"
                expand={"sm"}
                className="mb-3"
                bg="dark"
                variant="dark"
            >
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        Home
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {/* Center aligned shopping lists link */}
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => navigate("/shoppingList")}>
                                    Shopping Lists
                                </Nav.Link>
                            </Nav>

                            {/* Right aligned user links */}
                            <Nav>
                                {currentUser && (
                                    <Nav.Link>
                                        Logged user: {currentUser.name}
                                    </Nav.Link>
                                )}
                                {!currentUser && (
                                    <Nav.Link onClick={() => setShowLoginModal(true)}>
                                        Login
                                    </Nav.Link>
                                )}
                                {currentUser && (
                                    <Nav.Link onClick={logout}>
                                        Logout
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

            {/* Login Modal */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* User dropdown - populate with your user data */}
                    <DropdownButton id="dropdown-item-button" title="Select User">
                        {users.map((user) => (
                            <Dropdown.Item as="button" key={user.id} onClick={() => handleLogin(user)}>
                                {user.name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Modal.Body>
            </Modal>

            <Outlet/>
        </div>
    );
}

export default App;
