import logo from './logo.svg';
import './App.css';
import Header from './compo/Header';
import Sidebar from './compo/main/Sidebar';
import Page from './compo/main/Page';
import { Route, Router, Routes } from 'react-router-dom';
import Askquestion from './compo/createquestion/Askquestion';
import Login from './compo/login/login';
import Signup from './compo/login/signup';
import Form from './compo/login/Form';
import MainQuestion from './compo/viewquestion/MainQuestion';
import Index from './compo/viewquestion';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      
      <Route path='/' element={<Page/>}/>
      <Route path='/ask-question' element={<Askquestion/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/reset-password/:id/:token'element={<Form/>}/>
      <Route path='/form'element={<Form/>}/>
      {/* <Route path='/question view'element={<Index/>}/> */}

      
      </Routes>
    </div>
  );
}

export default App;
