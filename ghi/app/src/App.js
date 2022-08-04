import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './automobileList';
import AutomobileForm from './automobileForm';
import SalesPersonForm from './salesPerson';
import CustomerForm from './customer';
import SalesForm from './salesForm';
import SaleList from './saleList';
import SalesPersonHistoryForm from './salesPersonHistory';
import TechnicianForm from './technician';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container py-3">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="ManuList" element= {<ManufacturerList />}/>
          <Route path="ManuForm" element= {<ManufacturerForm />}/>
          <Route path="AutoList" element= {<AutomobileList />}/>
          <Route path="AutoForm" element= {<AutomobileForm />}/>
          <Route path="salesPersonForm" element= {<SalesPersonForm />}/>
          <Route path="customerForm" element= {<CustomerForm />}/>
          <Route path="salesForm" element= {<SalesForm />}/>
          <Route path="salesList" element={<SaleList/>}/>
          <Route path="saleHistory" element={<SalesPersonHistoryForm/>}/>
          <Route path="technicianForm" element={<TechnicianForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
