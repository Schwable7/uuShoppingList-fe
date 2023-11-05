import React from "react";
import ShoppingListDetail from "../bricks/ShoppingListDetail";

function ShoppingList({shoppingList}) {


    return (
        <>
            <ShoppingListDetail shoppingList={shoppingList} />
        </>
    );
}

export default ShoppingList;