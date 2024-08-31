import React from "react";
import "../CSS/Footer.css";
import Facebook from "../Resources/Facebook.svg";
import Linkedin from "../Resources/Linkedin.svg";
import Youtube from "../Resources/Youtube.svg";
import Instagram from "../Resources/Instagram.svg";

const Footer = () => {
    return(
    <>
    <footer>
        <div className="NameNsocials">
            <div className="Name">Rural Kitchen</div>
            <div className="Socials">
                <a href="https://facebook.com">
                {" "}
                <img src={Facebook} />
                </a>
                <a href="https://linkedin.com">
                {" "}
                <img src={Linkedin} />
                </a>
                <a href="https://youtube.com">
                {" "}
                <img src={Youtube} />
                </a>
                <a href="https://instagram.com">
                {" "}
                <img src={Instagram} />
                </a>
            </div>
        </div>
            <div className="Navigations">
                <div className="Nav">
                <a href="" className="TOC">View terms and conditions</a>
                </div>
                <div className="Nav">
                <a href="" className="ABT">About us</a>
                </div>
                <div className="Nav">
                <a href="" className="PP">Privacy policy</a>
                </div>
            </div>
            <div className="contactinfo">
                Contact information
                <p>Phone 0712345678</p>
                <p>Email ruralkitchen@123.com</p>
                <p>POBox 122121 000101</p>
            </div>
            <div className="about">
                About us
                <p>We are two friends with the same name (just spelt <br /> 
                slightly different) who share the same vision and <br /> 
                dream. Together we’ve partnered up and <br />
                developed a site where you and your loved ones <br />
                can discover or re-kindle your passion for cooking.</p>
            </div>
    </footer>
    </>
    );
};

export default Footer;