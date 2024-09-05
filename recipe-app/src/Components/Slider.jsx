import "../CSS/Slider.css";
import Chicken from "../Images/ChickenPie.jpg";
import Carbonara from "../Images/Carbonara.jpg";
import PotatoSalad from "../Images/PotatoSalad.jpg";
import Steak from "../Images/Steak.jpg";
import ChickenShawarma from "../Images/ChickenShawarma.jpg";
import React from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const Slider = () => {
    const images = [
        Chicken,
        Carbonara,
        PotatoSalad,
        Steak,
        ChickenShawarma,
    ];
    return (
        <Slide slidesToScroll={1} slidesToShow={3} indicators={true}>
            <div className="each-slide-effect">
                <a href=""style={{ 'backgroundImage': `url(${images[2]})` }}>
                    <span>Potato Salad</span>
                </a>
            </div>
            <div className="each-slide-effect">
                <a href=""style={{ 'backgroundImage': `url(${images[3]})` }}>
                    <span>Steak</span>
                </a>
            </div>
            <div className="each-slide-effect">
                <a href=""style={{ 'backgroundImage': `url(${images[1]})` }}>
                    <span>Carbonara</span>
                </a>
            </div>
            <div className="each-slide-effect">
                <a href=""style={{ 'backgroundImage': `url(${images[0]})` }}>
                    <span>Chicken Pie</span>
                </a>
            </div>
            <div className="each-slide-effect">
                <a href=""style={{ 'backgroundImage': `url(${images[4]})` }}>
                    <span>Chicken Shawarma</span>
                </a>
            </div>
        </Slide>
    );
};
export default Slider;