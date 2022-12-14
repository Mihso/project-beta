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
import ServiceForm from './serviceForm';
import ServiceHistoryForm from './serviceHistory';
import VehicleList from './VehicleList';
import VehicleForm from './VehicleForm';
import AppointmentList from './appointmentList';
import Game from './game';

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
          <Route path="technician" element={<TechnicianForm/>}/>
          <Route path="serviceForm" element={<ServiceForm/>}/>
          <Route path="serviceHistory" element={<ServiceHistoryForm/>}/>
          <Route path="vehicleList" element={<VehicleList/>}/>
          <Route path="vehicleForm" element={<VehicleForm/>}/>
          <Route path="AppointmentList" element={<AppointmentList/>}/>
          <Route path="game" element={<Game/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
