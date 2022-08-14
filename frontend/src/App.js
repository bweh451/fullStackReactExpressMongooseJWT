import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import RegisterOrLogin from './components/loginAndRegistration/RegisterOrLogin';
import Repos from './components/repositories/Repos';
import Users from './components/users/Users';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<RegisterOrLogin/>}/>
          <Route exact path="/login" element={<RegisterOrLogin/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/repos" element={<Repos/>}/>
          <Route exact path="/users" element={<Users />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
