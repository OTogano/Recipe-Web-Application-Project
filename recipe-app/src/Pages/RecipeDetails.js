import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import "../CSS/RecipeDetails.css";

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
  
    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/recipe/${id}`);
          setRecipe(response.data); // Store the fetched recipe data
        } catch (error) {
          console.error("Error fetching recipe details:", error);
        }
      };
  
      fetchRecipe();
    }, [id]);
  
    if (!recipe) {
      return <div>Loading...</div>;
    }
  
    const imageUrl = `http://localhost:4000/uploads/${recipe.recipeImage}`;    
  return (

    <>
    <Header/>
    <div className="recipe-detail">
          <div className='image_container'>
          <img
              src={imageUrl}
              alt={recipe.recipe_name}
              className='image' />
          </div>
          <div className='nameAndOwner'>
          <h1>{recipe.recipe_name}</h1>
          <h3
          style={{color:"grey"}}>by Chef: {recipe.recipe_owner}</h3>
          </div>
          <div className='ingredients'>
          <h4
          className='text'
          >Ingredients:</h4>
          <ul>
              {recipe.ingredients.split(',').map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
              ))}
          </ul>
          </div>
          <div className='instructions'>
          <h4
          className='text'
          >Instructions:</h4>
          <p>{recipe.instructions}</p>
          </div>
      </div>
      <Footer/>
      </>
  );
};

export default RecipeDetails;
