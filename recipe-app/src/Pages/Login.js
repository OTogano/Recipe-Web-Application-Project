import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../CSS/Login.css";

const Login = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

      const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:4000/login",{
                username: formData.username,
                password: formData.password,
            });

            const token = response.data.token;
            alert("Login successful!");        
        
            localStorage.setItem("authToken", token);
            console.log(token);
            navigate("/");
        } catch (error){
            console.error("Login failed:", error.response?.data || error.message);
            alert("Invalid username or password. Please try again.");
        }
      };

return(
    <>
    <Header />

    <div className="Login">
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <div>
            <input type="text" id="username" name="username" className="username" placeholder="username" value={formData.username} onChange={handleChange} required />
            </div>
            <label htmlFor="password">Password</label>
            <div>
            <input type="password" id="password" name="password" className="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>            
            <div className="center">
            <button type="submit" className="SignIn">
            Login
            </button>
            </div>

        </form>
    </div>

    <Footer />
    </>
);
};

export default Login;