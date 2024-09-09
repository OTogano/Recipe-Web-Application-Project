import React from "react";
import "../CSS/Card.css"

const Card = ({imageSrc,food,rating,type}) =>{
    return(
        <div className="CardContainer">
            <a href="#" className="foodLink">
                <img src={imageSrc} alt="Rural Kitchen" className="foodImg"/>
                <p className="food">{food}</p>
                <p className="rating">{rating}</p>
                <p className="type">{type}</p>
            </a>
        </div>
    );
};
export default Card;