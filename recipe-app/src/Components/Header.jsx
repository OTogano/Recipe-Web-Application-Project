import React, { useState, useEffect } from "react";
import "../CSS/Header.css";
import logo from "../Resources/Logo.svg";
import Search from "../Resources/icon.svg";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Check if a token is saved
        if (token) {
          setIsLoggedIn(true); // Assume logged in if token exists
        }
      }, []);

      const handleLogout = () => {
        localStorage.removeItem("authToken"); // Clear the token
        setIsLoggedIn(false); // Update state
        alert("Logout Successful!")
        window.location.href = "/Login";
      };

    return(
        <header className="header">
                <div className="Topbar">
                    <div className="logo"><a href="http://localhost:3000/"><img className="imglogo" src={logo} /></a></div>
                    <div className="Title">Rural Kitchen</div>
                    <div className="SearchBar">
                        <form>
                            <input type="text"
                                className="recipeSearch"
                                placeholder="Search for a recipe" />
                        </form>
                        <img src={Search} className="search"/>
                    </div>
                    <div className="buttons">
                        {isLoggedIn ?(
                            <>
                            <a href="/ChefPage">
                            <button className="addRecipe">Add Recipe</button>
                            </a>
                            <button className="register" onClick={handleLogout}>
                                Sign Out
                            </button>
                            </>
                        ):(
                            <>
                            <a href="./Login">
                            <button className="login">Log in</button>
                            </a>
                            <a href="./Register">
                            <button className="register">Register</button>
                            </a>
                            </>
                        )}
                        
                    </div>
                </div>
                <div className="Bottombar">
                    <div className="recipes">
                        <a href="#">Chicken</a>
                        <a href="#">Beef</a>
                        <a href="#">Cakes</a>
                        <a href="#">Pizza</a>                        
                        <a href="#">More</a>                        
                    </div>
                </div>
            </header>
    );
};

export default Header
