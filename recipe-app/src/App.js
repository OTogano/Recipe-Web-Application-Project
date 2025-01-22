import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Index from "./Pages/Index"
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import RecipePage from "./Pages/RecipePage";
import ChefPage from "./Pages/ChefPage";
import RecipeDetails from "./Pages/RecipeDetails";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Index />}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/RecipePage" element={<RecipePage/>}/>
      <Route path="/ChefPage" element={<ChefPage/>}/>
      <Route path="/recipe/:id" element={<RecipeDetails/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
