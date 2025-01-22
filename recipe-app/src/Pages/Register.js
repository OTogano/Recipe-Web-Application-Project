import React,{ useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../CSS/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "male"
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation for password match
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        try {
            // Send registration data to backend
            const response = await axios.post("http://localhost:4000/register", {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              gender: formData.gender
            });
      
            console.log(response.data); // Handle the response if needed (like showing a success message)
            alert("Registration successful!");
            navigate("/Login");
          } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.");
          }
        };
return(
    <>
    <Header />

    <div className="Registration">
        <form onSubmit={handleSubmit}>
            <label htmlFor="Username">Username</label>
            <div>
            <input type="text" id="username" name="username" className="username" placeholder="eg. John Doe" value={formData.username} onChange={handleChange} required />
            </div>
            <label htmlFor="email">Email</label>
            <div>
            <input type="email" id="email" name="email" className="email" placeholder="eg. example@123.com" value={formData.email} onChange={handleChange} required />
            </div>
            <label htmlFor="password">Password</label>
            <div>
            <input type="password" id="password" name="password" className="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <label htmlFor="password">Confirm Password</label>
            <div>
            <input type="password" id="confirmpassword" name="confirmPassword" className="confirmpassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <label htmlFor="UserType">Gender</label>
            <div>
            <select
            name="gender"
            value={formData.gender}
            onChange={handleChange} 
            className="Type">
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
            </div>
            <div className="center">
            <button type="submit" className="Register">
            Register
            </button>
            </div>

        </form>
    </div>

    <Footer />
    </>
);
};

export default Register;