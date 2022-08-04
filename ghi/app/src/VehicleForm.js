import React from 'react'

class VehicleForm extends React.Component {
    constructor(props){
        super(props);
    this.state= {
        name:'',}
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}
async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    delete data.locations


    const vehicleUrl = `http://localhost:8100/api/models/`
    const fetchConfig = {
        method:"post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
    }
    }
    const response = await fetch(vehicleUrl, fetchConfig)
    if (response.ok) {
        const newVehicle = await response.json()
        const cleared = {
            name: '',
        }
        this.setState(cleared)
    }
}
handleNameChange(event){
    const value = event.target.value
    this.setState({name: value})
}

async componentDidMount(){

    }

    render(){
    return(
    <div className="my-5 container">
        <div className="row">
            <div className="col">
                <div className="card-shadow">
                    <div className="card-body">
                    <form onSubmit={this.handleSubmit} id="create-vehicle-form">
                        <h1 className="card-title">Create a Vehicle</h1>
                        <p className="mb-3">
                            Who made your vehicle?
                        </p>
                        <div className="mb-3">
                        </div>
                        <div className='row'>
                            <div className='col'>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} value={this.state.name} required placeholder="Name" type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        </div>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className="alert alert-success d-none mb-0" id="success-message">
                        Vehicle Created!
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


}

export default VehicleForm 