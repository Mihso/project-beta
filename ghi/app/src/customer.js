import React from 'react';

class CustomerForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        name:'',
        address:'',
        phoneNumber: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
}

async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};

    const hatUrl = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            const cleared = {
                name: '',
                address: '',
                phoneNumber: '',
              };
            this.setState(cleared);
        }
}

handleNameChange(event){
    const value = event.target.value;
    this.setState({name: value});
}
handleAddressChange(event){
    const value = event.target.value;
    this.setState({address: value});
}
handleNumberChange(event){
    const value = event.target.value;
    this.setState({phoneNumber: value});
}

async componentDidMount(){

}

    render(){
    return(
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
            <form onSubmit={this.handleSubmit} id="create-hat-form">
                <h1 className='card-title'>Add a customer</h1>
                <p className='mb-3'>

                </p>
                <div className="mb-3">
                  </div>
                  <div className = 'row'>
                    <div className = 'col'>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} value={this.state.name} required placeholder="Name" type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleAddressChange} value={this.state.address} required placeholder="Address" type="text" name="address" id="address" className="form-control" />
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNumberChange} value={this.state.phoneNumber} required placeholder="Number" type="number" name="number" id="number" className="form-control" />
                    <label htmlFor="number">Phone Number</label>
                  </div>
                  </div>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form> 
              <div className="alert alert-success d-none mb-0" id="success-message">
                Successful Hire
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
}

export default CustomerForm;