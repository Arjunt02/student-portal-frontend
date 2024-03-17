
import { Route, Routes} from 'react-router-dom';
import './App.css';
import Create from './Components/Create';
import Update from './Components/Update';
import Users from './Components/Users';
import View from './Components/View';



function App() {
  return (
    <>

    <Routes>
      <Route path='/' element={<Users/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/update/:id' element={<Update/>} />
      <Route path='/view/:id' element={<View/>} />
    </Routes>
      
    </>
  );
}

export default App;
