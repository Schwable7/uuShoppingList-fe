import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ShoppingList from "./routes/ShoppingList";
import App from "./App";
import ShoppingListsView from "./bricks/ShoppingListsView";

const root = ReactDOM.createRoot(document.getElementById('root'));

const shoppingLists = [
    {
        id:1,
        title: "Groceries",
        owner: {id: 1, name: "Mike"},
        members: [
            {id: 1, name: "Mike"},
            {id: 3, name: "John"},
        ],
        items: [
            {id: 1, name: "Milk"},
            {id: 2, name: "Bread"},
            {id: 3, name: "Eggs"},
            {id: 4, name: "Apples"},
            {id: 5, name: "Bannana"}
        ]
    }
    ]
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="" element={<App/>}>
                    <Route path="/shoppingList" element={<ShoppingListsView shoppingLists={shoppingLists}/>}/>
                    <Route path="/shoppingList/:id" render={(props) => {
                        const shoppingListId = props.match.params.id;
                        const selectedShoppingList = shoppingLists.find(list => list.id.toString() === shoppingListId);
                        return selectedShoppingList
                            ? <ShoppingList shoppingList={selectedShoppingList} />
                            : <div>Shopping list not found.</div>;
                    }} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
