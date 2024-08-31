import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../CSS/Register.css";

const Register = () => {
return(
    <>
    <Header />

    <div className="Registration">
        <form>
            <label htmlFor="UserType">UserType</label>
            <div>
            <select className="Type">
                <option value="NormalUser">Normal User</option>
                <option value="Chef">Chef</option>
            </select>
            </div>
            <label htmlFor="Username">Username</label>
            <div>
            <input type="text" id="username" className="username" placeholder="eg. John Doe" required />
            </div>
            <label htmlFor="email">Email</label>
            <div>
            <input type="email" id="email" className="email" placeholder="eg. example@123.com" required />
            </div>
            <label htmlFor="password">Password</label>
            <div>
            <input type="password" id="password" className="password" placeholder="Password"required />
            </div>
            <label htmlFor="password">Confirm Password</label>
            <div>
            <input type="password" id="confirmpassword" className="confirmpassword" placeholder="Confirm Password" required />
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