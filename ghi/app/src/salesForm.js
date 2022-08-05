import React from 'react';

class SalesForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        price:'',
        autos: [],
        persons: [],
        customers:[],
    };

    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleAutoChange = this.handleAutoChange.bind(this);
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
}

async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    delete data.autos;
    delete data.persons;
    delete data.customers;

    const soldAutoUrl = `http://localhost:8100/api/automobiles/${data.auto}/`;
    const soldAuto = await fetch(soldAutoUrl);
    const autoDetails = await soldAuto.json();
    autoDetails.sold = true;
    const fetchSoldConfig = {
        method: "put",
        body: JSON.stringify(autoDetails),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const soldResponse = await fetch(soldAutoUrl, fetchSoldConfig);
        if (soldResponse.ok) {
            console.log("got it")
        }

    const salesUrl = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const cleared = {
                price: '',
                auto: '',
                person: '',
                customer: '',
              };
            this.setState(cleared);
        }

        const autoUrl = 'http://localhost:8100/api/automobiles/';

        const autoResponse = await fetch(autoUrl);
    
        if (autoResponse.ok) {
            const data = await autoResponse.json();
            const soldAuto = data.autos.filter(auto => {return auto.sold === false});
            this.setState({autos: soldAuto});
        }
}

handlePriceChange(event){
    const value = event.target.value;
    this.setState({price: value});
}
handleAutoChange(event){
    const value = event.target.value;
    this.setState({auto: value});
}
handlePersonChange(event){
    const value = event.target.value;
    this.setState({person: value});
}
handleCustomerChange(event){
    const value = event.target.value;
    this.setState({customer: value});
}


async componentDidMount(){
    const autoUrl = 'http://localhost:8100/api/automobiles/';

    const autoResponse = await fetch(autoUrl);

    if (autoResponse.ok) {
        const data = await autoResponse.json();
        const soldAuto = data.autos.filter(auto => {return auto.sold === false});
        this.setState({autos: soldAuto});
      }
    const personUrl = 'http://localhost:8090/api/salesPerson/';

    const personResponse = await fetch(personUrl);
  
    if (personResponse.ok) {
        const data = await personResponse.json();
          this.setState({persons: data.salesPeople});
    }
    const customerUrl = 'http://localhost:8090/api/customers/';

    const customerResponse = await fetch(customerUrl);
    
    if (customerResponse.ok) {
        const data = await customerResponse.json();
        this.setState({customers: data.customers});
    }
}

    render(){
    return(
    <div className="my-2 container">
      <div className="px-2 py-3 my-5 mt-0 rounded-pill text-center bg-success">
          <h1 className="display-5 fw-bold">Record a Sale</h1>
          <div className="col-lg-6 mx-auto" />
        </div>
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
            <form onSubmit={this.handleSubmit} id="create-sales-form">
                <p className='mb-3'>
                    Submit sale information.
                </p>
                <div className="mb-3">
                    <select onChange={this.handleAutoChange} value={this.state.auto} required id="auto" name = "auto" className="form-select">
                      <option value="">Choose a Automobile.</option>
                      {this.state.autos.map(auto => {
                        return(
                          <option key={auto.vin} value={auto.vin}>
                          {auto.vin}
                          </option>  
                        );
                      })}
                    </select>
                  </div>
                  <div className = 'row'>
                    <div className = 'col'>
                    <div className="mb-3">
                    <select onChange={this.handlePersonChange} value={this.state.person} required id="person" name = "person" className="form-select">
                      <option value="">Choose a Sales person.</option>
                      {this.state.persons.map(person => {
                        return(
                          <option key={person.employeeNumber} value={person.employeeNumber}>
                          {person.name}
                          </option>  
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleCustomerChange} value={this.state.customer} required id="customer" name = "customer" className="form-select">
                      <option value="">Choose a customer.</option>
                      {this.state.customers.map(customer => {
                        return(
                          <option key={customer.id} value={customer.id}>
                          {customer.name}
                          </option>  
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handlePriceChange} value={this.state.price} required placeholder="Price" type="float" name="price" id="price" className="form-control" />
                    <label htmlFor="vin">Sales Price</label>
                  </div>
                  </div>
                  </div>
                  <button className="btn btn-success">Create</button>
                </form> 
              <div className="alert alert-success d-none mb-0" id="success-message">
                Sale established.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
}

export default SalesForm;