import React from 'react';

class ManufacturerForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        name:'',};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
}

async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};

    const ManufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(ManufacturerUrl, fetchConfig);
        if (response.ok) {
            const cleared = {
                name: '',
              };
            this.setState(cleared);
        }
}

handleNameChange(event){
    const value = event.target.value;
    this.setState({name: value});
}


async componentDidMount(){

    }

    render(){
    return(
    <div className="my-2 container">
        <div className="px-2 py-3 my-5 mt-0 rounded-pill text-center bg-success">
          <h1 className="display-5 fw-bold">Create a Manufacturer</h1>
        <div className="col-lg-6 mx-auto">
      </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
            <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                <p className='mb-3'>
                    Who is making cars today?
                </p>
                <div className="mb-3">
                  </div>
                  <div className = 'row'>
                    <div className = 'col'>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} value={this.state.name} required placeholder="Name" type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  </div>
                  </div>
                  <button className="btn btn-success">Create</button>
                </form> 
              <div className="alert alert-success d-none mb-0" id="success-message">
                Manufacturer established!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
}

export default ManufacturerForm;