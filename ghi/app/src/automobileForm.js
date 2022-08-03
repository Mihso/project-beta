import React from 'react';

class AutomobileForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        color:'',
        year: '',
        vin: '',
        models:[],
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
}

async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    delete data.models;

    const autoUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {
            const cleared = {
                color: '',
                year: '',
                vin: '',
                model_id: '',
              };
            this.setState(cleared);
        }
}

handleColorChange(event){
    const value = event.target.value;
    this.setState({color: value});
}
handleVinChange(event){
    const value = event.target.value;
    this.setState({vin: value});
}
handleYearChange(event){
    const value = event.target.value;
    this.setState({year: value});
}
handleModelChange(event){
    const value = event.target.value;
    this.setState({model_id: value});
}


async componentDidMount(){
    const url = 'http://localhost:8100/api/models/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
        this.setState({models: data.models});
      }
    }

    render(){
    return(
    <div className="my-2 container">
        <div className="px-2 py-3 my-5 mt-0 rounded-pill text-center bg-success">
          <h1 className="display-5 fw-bold">Create an Automobile</h1>
          <div className="col-lg-6 mx-auto" />
        </div>
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
                <p className='mb-3'>
                    Make your dream automobile today.
                </p>
                <div className="mb-3">
                    <select onChange={this.handleModelChange} value={this.state.model} required id="model" name = "model" className="form-select">
                      <option value="">Choose a model.</option>
                      {this.state.models.map(model => {
                        return(
                          <option key={model.id} value={model.id}>
                          {model.name}
                          </option>  
                        );
                      })}
                    </select>
                  </div>
                  <div className = 'row'>
                    <div className = 'col'>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleColorChange} value={this.state.color} required placeholder="Color" type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleYearChange} value={this.state.year} required placeholder="Year" type="number" name="year" id="year" className="form-control" />
                    <label htmlFor="year">Year</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleVinChange} value={this.state.vin} required placeholder="Vin" type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="vin">VIN (At most 17 characters)</label>
                  </div>
                  </div>
                  </div>
                  <button className="btn btn-success">Create</button>
                </form> 
              <div className="alert alert-success d-none mb-0" id="success-message">
                Automobile built!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
}

export default AutomobileForm;