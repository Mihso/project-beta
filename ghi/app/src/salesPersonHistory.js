import React from 'react';

async function updater(props){
    const salesUrl = 'http://localhost:8090/api/sales/';

    const salesResponse = await fetch(salesUrl);
    
    if (salesResponse.ok) {
        const data = await salesResponse.json();
        console.log(data.sales);
        const after = data.sales.filter(sale => {
            console.log(sale)
            return sale.person.employeeNumber == props.state.person})
        console.log(after)
        props.setState({sales: after});
    }
}

class SalesPersonHistoryForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        sales:[],
        persons: [],
    };

    this.handleSalesChange = this.handleSalesChange.bind(this);
    this.handlePersonChange = this.handlePersonChange.bind(this);
    
}

handleSalesChange(event){
    const value = event.target.value;
    this.setState({sale: value});
}

handlePersonChange(event){
    const value = event.target.value;
    this.setState({person: value});
    updater(this);
}


async componentDidMount(){

    const personUrl = 'http://localhost:8090/api/salesPerson/';

    const personResponse = await fetch(personUrl);
  
    if (personResponse.ok) {
        const data = await personResponse.json();
          this.setState({persons: data.salesPeople});
    }
    const salesUrl = 'http://localhost:8090/api/sales/';

    const salesResponse = await fetch(salesUrl);
    
    if (salesResponse.ok) {
        const data = await salesResponse.json();
        console.log(data.sales);
        const after = data.sales.filter(sale => {return sale.person.employeeNumber = this.state.person})
        this.setState({sales: after});
    }
}

    render(){
    return(
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
                <h1 className='card-title'>Sales List</h1>
                <p className='mb-3'>
                    Submit a sale.
                </p>
                <div className="mb-3">
                    <select onChange={this.handlePersonChange} value={this.state.person} required id="person" name = "person" className="form-select">
                      <option value="">Choose a Sales Person.</option>
                      {this.state.persons.map(person => {
                        return(
                          <option key={person.employeeNumber} value={[person.employeeNumber]}>
                          {person.employeeNumber}
                          </option>  
                        );
                      })}
                    </select>
                  </div>
            </div>
          </div>
        </div>
      </div>
      <p>  </p>
      <div className = 'row'>
         <div className = 'col'>
            <div className="row gx-5 gy-3 row-cols-3">
            <table className="center table">
                <thead>
                    <tr>
                        <th scope="col">Sale's Person</th>
                        <th scope="col">Employee Number</th>
                        <th scope="col">Purchaser</th>
                        <th scope="col">Automobile VIN</th>
                        <th scope="col">Price of sale</th>
                    </tr>
                </thead>
                <tbody>
            {this.state.sales.map((sale) => {
                console.log(sale.person.employeeNumber)
              return (
                <tr scope="row" key={sale.id}>
                <td><p>{sale.person.name}</p></td>
                <td><p>{sale.person.employeeNumber}</p></td>
                <td><p>{sale.customer.name}</p></td>
                <td><p>{sale.auto.vin}</p></td>
                <td><p>${sale.price}</p></td>
              </tr>
              );}
            )}
            </tbody>
            </table>
          </div>
                  </div>
                  </div>
    </div>
    
        );
    }
}

export default SalesPersonHistoryForm;