
import{Routes,Route} from "react-router-dom"
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import {Registration} from "./pages/Customer_Registration"
import {ContactUs} from  "./pages/ContactUs"
import { LogIn } from "./pages/LogIn";
import {Navbar} from "./components/Navbar"
import {ShoppingCartProvider} from "./context/ShoppingCartContext"

function App() {
  return (
    <>
    <ShoppingCartProvider>
    <Navbar/>
    <Container className="mb-4">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/ContactUs' element={<ContactUs/>}/>
        <Route path='/Registration' element={<Registration/>}/>
        
        <Route path='/LogIn' element={<LogIn/>}/>
     
      </Routes>
    </Container>
    </ShoppingCartProvider>
    </>
  );
}

export default App;
