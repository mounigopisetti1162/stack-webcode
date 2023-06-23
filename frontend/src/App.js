import logo from './logo.svg';
import './App.css';
import Header from './compo/Header';
import Sidebar from './compo/main/Sidebar';
import { ToastContainer } from 'react-toastify';
import Page from './compo/main/Page';
import { Route, Router, Routes } from 'react-router-dom';
import Askquestion from './compo/createquestion/Askquestion';
// import Login from './compo/login/login';
// import Signup from './compo/login/signup';
import Form from './compo/login/Form';
import MainQuestion from './compo/viewquestion/MainQuestion';
import Index from './compo/viewquestion';
import Signup from './compo/login/signup2';
import Login from './compo/login/login2';

function App() {
  return (
    <div className="App">
        <ToastContainer/>
      <Header/>
      <Routes>
      
      <Route path='/' element={<Page/>}/>
      <Route path='/:token' element={<Page/>}/>
      <Route path='/askquestion' element={<Askquestion/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/reset-password/:id/:token'element={<Form/>}/>
      <Route path='/form'element={<Form/>}/>
      <Route path='/questionview/:id' element={<Index/>}/>
      {/* <Route path='/answer' element={<Index/>}/> */}

      
      </Routes>
    </div>
  );
}

export default App;
