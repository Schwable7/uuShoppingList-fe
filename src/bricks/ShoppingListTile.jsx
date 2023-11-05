import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from '@mui/material';
import {Link} from "react-router-dom";

function ShoppingListTile({shoppingList}) {
    return (
        <Link to={`/shoppingList/${shoppingList.id}`} style={{textDecoration: 'none'}}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {shoppingList.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {shoppingList.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}

export default ShoppingListTile;
