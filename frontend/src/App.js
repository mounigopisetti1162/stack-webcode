import logo from './logo.svg';
import './App.css';
import Header from './compo/Header';
import Sidebar from './compo/main/Sidebar';
import Page from './compo/main/Page';
import { Route, Router, Routes } from 'react-router-dom';
import Askquestion from './compo/main/Askquestion';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      
      <Route path='/' element={<Page/>}/>
      <Route path='/ask-question' element={<Askquestion/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
