import React from "react";
import "../CSS/Card.css"
import { Link } from 'react-router-dom';


const Card = ({recipe}) =>{
    const imageUrl = `http://localhost:4000/uploads/${recipe.recipe_image}`;
    return(
        <>
        <div className="CardContainer">
            <Link to={`/recipe/${recipe.recipe_id}`}>
            <img src={imageUrl}
                alt={recipe.recipe_name} className="foodImg" />
            <p className="food">{recipe.recipe_name}</p>
            <p className="type">{recipe.recipe_category}</p>
            </Link>
        </div>
        </>
    );
};
export default Card;