import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup'
import Home from './Components/Home';
import {Routes,BrowserRouter as Router,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
const userId=localStorage.getItem("userId");
function PrivateRoute({children}){
  return userId?children:<Login/>;
}
function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={ <PrivateRoute><Home/></PrivateRoute>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      
    </Routes>
    <ToastContainer/>
  </Router>
  );
}

export default App;
