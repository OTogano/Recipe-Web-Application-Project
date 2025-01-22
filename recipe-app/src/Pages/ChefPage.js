import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import "../CSS/ChefPage.css";
import React, {useState} from "react";
import axios from "axios";

const ChefPage = () => {

const [recipeName, setRecipeName] = useState(""); 
const [recipeCategory, setRecipeCategory] = useState(""); 
const [recipeOwner, setRecipeOwner] = useState(""); 
const [recipeImage, setRecipeImage] = useState(null); 
const [Ingredients, setIngredients] = useState("");
const [Instructions, setInstructions] = useState(""); 

const navigate = useNavigate();
 
const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipe_name",recipeName);
    formData.append("recipe_category",recipeCategory);
    formData.append("recipe_owner",recipeOwner);
    formData.append("recipe_image",recipeImage);
    formData.append("ingredients",Ingredients);
    formData.append("instructions",Instructions);

    try {
        const response = await axios.post("http://localhost:4000/submit-recipe", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

    console.log("Form submitted successfully:", response.data);
    alert("Recipe submitted successfully");
    navigate("/");
    }catch (error) {
        console.error("Error submitting form:", error);
      }
};

return(
    <>
    <Header />

    <div className="mainContainer">
        <div className="title">Post a recipe</div>

       <div className="Registration">
        <form
        onSubmit={handleSubmit}>
            <label htmlFor="Recipe Name">Recipe Name</label>
            <div>
            <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)}required />
            </div>
            <label htmlFor="Recipe Name">Recipe Categoty</label>
            <div>
            <input type="text" value={recipeCategory} onChange={(e) => setRecipeCategory(e.target.value)}required />
            </div>
            <label htmlFor="Recipe Owner">Recipe Owner</label>
            <div>
            <input type="text" value={recipeOwner} onChange={(e) => setRecipeOwner(e.target.value)}required />
            </div>
            <label htmlFor="Recipe Image">Recipe Image</label>
            <div>
            <input type="file" name="recipe_image" onChange={(e) => setRecipeImage(e.target.files[0])}required  style={{borderWidth:0}}/>
            </div>
            <label htmlFor="Ingredients">Ingredients</label>
            <div>
            <textarea value={Ingredients} onChange={(e) => setIngredients(e.target.value)}
            style={{
            maxWidth:630,
            minWidth:630,
            minHeight:100,
            }}></textarea>
            </div>

            <label htmlFor="Ingredients">Instructions</label>
            <div>
            <textarea value={Instructions} onChange={(e) => setInstructions(e.target.value)}
            style={{
            maxWidth:630,
            minWidth:630,
            minHeight:100,
            }}></textarea>
            </div>
            
            <div className="center">
            <button type="submit" className="Register">
            submit
            </button>
            </div>

        </form>
    </div>

    </div>

    <Footer />
    </>
);
};
export default ChefPage;