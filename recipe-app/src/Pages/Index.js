// import Bacon from "../Images/BaconandEggs.jpg";
// import Garlic from "../Images/GarlicBread.jpg";
// import French from "../Images/FrenchToast.jpg";
// import Fries from "../Images/LoadedFries.jpg";
// import RedVelvet from "../Images/RedVelvet.jpg";
// import Cinnamon from "../Images/CinnamonRolls.jpg"; 
// import Burger from "../Images/BeefBurger.jpg";
// import Lasagna from "../Images/Lasagna.jpg";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";
import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../Components/Card";

import "../CSS/Index.css";

function Index() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios
        .get("http://localhost:4000/recipes")
        .then((response) => {
            console.log(response.data);
            setRecipes(response.data);
        })
        .catch((error)=>console.error("Error fetching recipes:", error));
    }, []);

    const handleCardClick = (id) => {
        navigate(`/recipe/${id}`);
    };

return(
    <>
    <Header /> 
    <Slider/>
    <p className="title" style={{justifySelf: "start"}}>Browse Recipes</p>
    <div>
        <div className="container">
            {recipes.map((recipe) =>(
                <Card
                key={recipe.recipe_id}
                recipe={recipe}
                onClick={handleCardClick}/>
            ))}
        </div>
        
    </div>
    <Footer/>
    </>
);
}
export default Index;
