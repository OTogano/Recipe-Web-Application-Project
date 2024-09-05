import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";
import "../CSS/Index.css";

function Index() {
return(
    <>
    <Header /> 
    <Slider/>
    <div className="main">Main Content</div>
    <Footer/>
    </>
);
}
export default Index;
