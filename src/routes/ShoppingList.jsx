import React from "react";
import ShoppingListDetail from "../bricks/ShoppingListDetail";
import {useParams} from "react-router-dom";
import {useShoppingListsCtx} from "../context/ShoppingListContext";

function ShoppingList() {

    let {id} = useParams();
    const {shoppingLists} = useShoppingListsCtx();
    const shoppingListId = parseInt(id, 10); // Convert the id to a number
    const selectedShoppingList = shoppingLists.find(list => list.id === shoppingListId);


    return (
        <>{selectedShoppingList ? (<ShoppingListDetail shoppingList={selectedShoppingList}/>
        ) : (<h3>Shopping list not found</h3>)}
        </>
    );
}

export default ShoppingList;