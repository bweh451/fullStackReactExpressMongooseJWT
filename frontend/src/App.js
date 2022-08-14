//Imported the following hooks and components for use below
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import RegisterOrLogin from './components/loginAndRegistration/RegisterOrLogin';
import Repos from './components/repositories/Repos';
import Users from './components/users/Users';

//Functional component
const App = () => {

  //Returns the following
  return (
    <div className="App">

      {/* Used browser router for routing */}
      <BrowserRouter>
        <Routes>
          
          {/* The following two routes displays the same component but with different props */} 
          <Route exact path="/register" element={<RegisterOrLogin/>}/>
          <Route exact path="/login" element={<RegisterOrLogin/>}/>

          {/* Each route displays a different component  */}
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/repos" element={<Repos/>}/>
          <Route exact path="/users" element={<Users />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//Exports the functional component
export default App;
