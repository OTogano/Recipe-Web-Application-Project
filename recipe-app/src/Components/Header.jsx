import React from "react";
import "../CSS/Header.css";
import logo from "../Resources/Logo.svg";
import Search from "../Resources/icon.svg";

const Header = () => {
    return(
        <header className="header">
                <div className="Topbar">
                    <div className="logo"><img className="imglogo" src={logo} /></div>
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
                        <button className="login">Log in</button>
                        <button className="register">Register</button>
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
