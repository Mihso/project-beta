import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './automobileList';
import AutomobileForm from './automobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="ManuList" element= {<ManufacturerList />}/>
          <Route path="ManuForm" element= {<ManufacturerForm />}/>
          <Route path="AutoList" element= {<AutomobileList />}/>
          <Route path="AutoForm" element= {<AutomobileForm />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
