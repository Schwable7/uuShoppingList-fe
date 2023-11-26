import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ShoppingList from "./routes/ShoppingList";
import App from "./App";
import ShoppingListsView from "./routes/ShoppingListsView";
import Home from "./routes/Home";
import {UserAuthProvider} from './context/UserAuthContext';
import {ShoppingListsProvider} from "./context/ShoppingListContext";
import {NotificationProvider} from "./context/NotificationContext";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserAuthProvider>
                <ShoppingListsProvider>
                    <NotificationProvider>
                        <Routes>
                            <Route path="/" element={<App/>}>
                                <Route path="" element={<Home/>}/>
                                <Route path="/shoppingList" element={<ShoppingListsView/>}/>
                                <Route path="/shoppingList/:id" element={<ShoppingList/>}/>
                            </Route>
                        </Routes>
                    </NotificationProvider>
                </ShoppingListsProvider>
            </UserAuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
