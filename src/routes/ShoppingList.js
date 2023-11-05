import React from "react";
import ShoppingListDetail from "../bricks/ShoppingListDetail";
import {useParams} from "react-router-dom";

function ShoppingList({shoppingLists}) {

    let {id} = useParams();
    const shoppingListId = parseInt(id, 10); // Convert the id to a number
    const selectedShoppingList = shoppingLists.find(list => list.id === shoppingListId);


    return (
        <>{selectedShoppingList ? (<ShoppingListDetail shoppingList={selectedShoppingList}/>
        ) : (<h3>Shopping list not found</h3>)}
        </>
    );
}

export default ShoppingList;