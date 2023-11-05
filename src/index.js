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

const root = ReactDOM.createRoot(document.getElementById('root'));

const shoppingLists = [
    {
        id: 1,
        title: "Groceries",
        owner: {id: 1, name: "Mike"},
        members: [
            {id: 1, name: "Mike"},
            {id: 3, name: "John"},
        ],
        items: [
            {id: 1, text: "Milk"},
            {id: 2, text: "Bread"},
            {id: 3, text: "Eggs"},
            {id: 4, text: "Apples"},
            {id: 5, text: "Bannana"}
        ]
    },
    {
        id: 2,
        title: "Trip shopping",
        owner: {id: 1, name: "Mike"},
        members: [
            {id: 2, name: "Larry"},
            {id: 1, name: "Mike"},
        ],
        items: [
            {id: 1, text: "Hiking boots"},
            {id: 2, text: "Tent"},
            {id: 3, text: "Gloves"},
            {id: 4, text: "Hat"},
            {id: 5, text: "Hiking poles"}
        ]
    },
    {
        id: 3,
        title: "Drug store",
        owner: {id: 1, name: "Mike"},
        members: [
            {id: 1, name: "Mike"},
            {id: 3, name: "John"},
        ],
        items: [
            {id: 1, text: "Tooth paste"},
            {id: 2, text: "Shampoo"},
            {id: 3, text: "Soap"}
        ]
    }
]
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserAuthProvider>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="" element={<Home/>}/>
                        <Route path="/shoppingList" element={<ShoppingListsView shoppingLists={shoppingLists}/>}/>
                        <Route path="/shoppingList/:id" element={<ShoppingList shoppingLists={shoppingLists}/>}/>
                    </Route>
                </Routes>
            </UserAuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
