import './App.css';
import Firstpage from './pages/firstpage';
import Pattern from './img/Pattern.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog from './pages/catalog';
import Shapka from './components/Shapka';
import Footer from './components/Footer';
import Registration from './pages/Registration';
import Authorization from './pages/Authorization';
import UserList from './pages/UserList';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Faq from './pages/Faq';
import ScrollButton from './components/ScrollButton';
import Buy from './pages/Buy';
import {observer} from "mobx-react-lite"




function App() {
  return (
    <div style={{ backgroundImage: `url(${Pattern})` }}>
      <Router>
      {window.location.pathname === '/register' && window.location.pathname === '/auth' ? null : <Shapka/>}        
        <Routes>
          <Route path='/users' element={<UserList />} />
          <Route path='/' element={<Firstpage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/product/:id' element={<Buy />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/auth' element={<Authorization />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <ScrollButton />  
        {window.location.pathname === '/register' && window.location.pathname === '/auth' ? null : <Footer/>}
      </Router>
    </div>
  );

}
export default observer(App);
