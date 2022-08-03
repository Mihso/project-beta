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
    <div className="my-3 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
            <form onSubmit={this.handleSubmit} id="create-hat-form">
                <h1 className='card-title'>Create a Manufacturer</h1>
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