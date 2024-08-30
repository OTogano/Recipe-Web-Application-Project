import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Index from "./Pages/Index"
import Register from "./Pages/Register";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Index />}/>
      <Route path="/Register" element={<Register/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
