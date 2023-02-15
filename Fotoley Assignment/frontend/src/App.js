import{Routes,Route} from "react-router-dom"
import { Container } from "react-bootstrap";
import './index.css';
import  Sign_Up from './pages/Sign_Up';
import Login from './pages/Login';
import { Community } from "./pages/Community";
import { Gallery } from "./pages/Gallery";
import Review from "./pages/Review";

function App() {
  return (
   <>
   <Container className="mb-4">
    
      <Routes>
        <Route path='/' element={<Sign_Up/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/community' element={<Community/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/review' element={<Review/>}/>

        
      </Routes>
    </Container>
   </>
  );
}

export default App;
