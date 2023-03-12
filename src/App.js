import './App.css';
import { Route,Routes } from 'react-router-dom';
import Header from './Components/Header';
import Card from './Components/Card';
import AddMovie from './Components/AddMovie';
import Detail from './Components/Detail';
import Login from './Components/Login';
import Signup from './Components/Signup';



function App() {
  return (
    <div >
        <Header></Header>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        
    </div>
  );
}

export default App;
