import React from 'react';

async function updater(props){
    const salesUrl = 'http://localhost:8090/api/sales/';

    const salesResponse = await fetch(salesUrl);
    
    if (salesResponse.ok) {
        const data = await salesResponse.json();
        const after = data.sales.filter(sale => {
            return sale.person.employeeNumber == props.state.person})
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
        const after = data.sales.filter(sale => {return sale.person.employeeNumber == this.state.person})
        this.setState({sales: after});
    }
}

    render(){
    return(
    <div className="my-2 container">
        <div className="px-2 py-3 my-5 mt-0 rounded-pill text-center bg-success">
          <h1 className="display-5 fw-bold">Sales Person History</h1>
          <div className="col-lg-6 mx-auto" />
        </div>
        <div className="row">
            <div className="col">
                <div className="card shadow">
                <div className="card-body">
                    <p className='mb-3'>
                        choose a sales person.
                    </p>
                    <div className="mb-3">
                        <select onChange={this.handlePersonChange} value={this.state.person} required id="person" name = "person" className="form-select">
                            <option value="">Choose a Sales Person.</option>
                            {this.state.persons.map(person => {
                            return(
                                <option key={person.employeeNumber} value={[person.employeeNumber]}>
                                    {person.name}
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
                <table className="center border border-5 border-success table">
                    <thead>
                        <tr>
                            <th scope="col">Sale's Person</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Automobile VIN</th>
                            <th scope="col">Price of sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map((sale) => {
                            return (
                                <tr scope="row" key={sale.id}>
                                    <td><p>{sale.person.name}</p></td>
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