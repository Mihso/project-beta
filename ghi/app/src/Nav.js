import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mx-2 mb-2 mb-lg-0">

          <NavLink className="navbar-brand" to="ManuList">Manufacturers</NavLink>

          <NavLink className="navbar-brand" to="ManuForm">Create Manufacturers</NavLink>

          <NavLink className="navbar-brand" to="vehicleList">Vehicles</NavLink>

          <NavLink className="navbar-brand" to="vehicleForm">Create Vehicle</NavLink>

          <NavLink className="navbar-brand" to="AutoList">Automobiles</NavLink>

          <NavLink className="navbar-brand" to="AutoForm">Create Automobiles</NavLink>

          <li className="navbar-nav dropdown">
            <a className="navbar-brand dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Sales
            </a>
          <ul className="dropdown-menu dropdown-menu-dark">
          <NavLink className="dropdown-item" to="salesPersonForm">Hire Sales Person</NavLink>
          <NavLink className="dropdown-item" to="customerForm">Add customer</NavLink>
          <NavLink className="dropdown-item" to="salesForm">Input a sale</NavLink>
          <NavLink className="dropdown-item" to="salesList">Sales List</NavLink>
          <NavLink className="dropdown-item" to="saleHistory">Sales Person History</NavLink>
          </ul>
          </li>
          <li className="navbar-nav dropdown">
            <a className="navbar-brand dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Services
            </a>
          <ul className="dropdown-menu dropdown-menu-dark">
          <NavLink className="dropdown-item" to="technician">Find a Technician</NavLink>
          <NavLink className="dropdown-item" to="serviceForm">Enter Service Appointment</NavLink>
          <NavLink className="dropdown-item" to="appointmentList">Appointments List</NavLink>
          <NavLink className="dropdown-item" to="serviceHistory">Service History</NavLink>
          </ul>
          </li>
          </ul>
          </div>
      </div>
    </nav>
  )
}

export default Nav;
