import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";
import Card from "../Components/Card";
import "../CSS/Index.css";
import Bacon from "../Images/BaconandEggs.jpg";
import Garlic from "../Images/GarlicBread.jpg";
import French from "../Images/FrenchToast.jpg";
import Fries from "../Images/LoadedFries.jpg";
import RedVelvet from "../Images/RedVelvet.jpg";
import Cinnamon from "../Images/CinnamonRolls.jpg"; 
import Burger from "../Images/BeefBurger.jpg";
import Lasagna from "../Images/Lasagna.jpg";
function Index() {
return(
    <>
    <Header /> 
    <Slider/>
    <p className="title">Trending</p>
    <div className="container">
        <div>
            <Card
            imageSrc={Bacon}
            food="Bacon and Eggs"
            rating="4.5"
            type="Breakfast"/>
        </div>
        <div>
            <Card
            imageSrc={Garlic}
            food="Garlic Bread"
            rating="4.1"
            type="Breakfast"/>
        </div>
        <div>
        <Card
            imageSrc={French}
            food="French Toast"
            rating="4.7"
            type="Breakfast"/>
        </div>
        <div>
        <Card
            imageSrc={Fries}
            food="Beef Loaded Fries"
            rating="4.0"
            type="Fries"/>
        </div>
    </div>

    <p className="title">All Time Favourites</p>
    <div className="container">
        <div>
            <Card
            imageSrc={RedVelvet}
            food="Red Velvet Cake"
            rating="4.4"
            type="Dessert"/>
        </div>
        <div>
            <Card
            imageSrc={Cinnamon}
            food="Cinnamon Rolls"
            rating="4.0"
            type="Dessert"/>
        </div>
        <div>
        <Card
            imageSrc={Burger}
            food="Beef Burger"
            rating="4.2"
            type="Beef"/>
        </div>
        <div>
        <Card
            imageSrc={Lasagna}
            food="Beef Lasagna"
            rating="5.0"
            type="Italian"/>
        </div>
    </div>
    <Footer/>
    </>
);
}
export default Index;
