// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Expertise from './components/Expertise';
import Slots from './components/Slots';
import About from './components/About';
import Logout from './components/Logout';
import MainPage from './components/MainPage';
import SeeMentor from './components/SeeMentor';
function App() {
  return (
    <div>
      <BrowserRouter >
      {/* <Nav /> */}
     <Routes>
       <Route path="/" element={<Home />} />
       {/* <Route path="/add" element={<AddProduct />} /> */}
       {/* <Route path="/update/:id" element={<UpdateProduct />} /> */}
       {/* <Route path="/logout" element={<h1> Logout Component</h1>} /> */}
       {/* <Route path="/profile" element={<h1>Profile Component</h1>} /> */}


       <Route path="/signup" element={<SignUp />} />
       <Route path="/expertise" element={<Expertise />} />
       <Route path="/slots" element={<Slots />} />
       <Route path="/about" element={<About />} />
       <Route path="/login" element={<Login />} />
       <Route path="/logout" element={<Logout />} />
       <Route path="/main" element={<MainPage/>}/>
       <Route path="/mentor/:id" element={<SeeMentor/>}/>

     </Routes>
     </BrowserRouter>
     {/* <Footer /> */}
    </div>
  );
}

export default App;
