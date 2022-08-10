import React from 'react'

class VehicleForm extends React.Component {
    constructor(props){
        super(props);
    this.state= {
        name:'',
        picture_url:'',
        manus: [],}
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleManuChange = this.handleManuChange.bind(this)
    this.handlePictureChange = this.handlePictureChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}
async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    delete data.locations
    delete data.manus


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
            picture_url: '',
            manufacturer_id:'',
        }
        this.setState(cleared)
    }
}
handleNameChange(event){
    const value = event.target.value
    this.setState({name: value})
}
handleManuChange(event){
    const value = event.target.value
    this.setState({manufacturer_id: value})
}
handlePictureChange(event){
    const value = event.target.value
    this.setState({picture_url: value})
}

async componentDidMount(){
    const manuUrl = 'http://localhost:8100/api/manufacturers/';

    const manuResponse = await fetch(manuUrl);

    if (manuResponse.ok) {
        const data = await manuResponse.json();
        this.setState({manus: data.manufacturers});
      }
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
                        <div className="form-floating mb-3">
                            <input onChange={this.handlePictureChange} value={this.state.picture_url} placeholder="Picture" required type="url" name = "pictureUrl" id="pictureUrl" className="form-control" />
                            <label htmlFor="pictureUrl">Picture</label>
                        </div>
                        <img src={this.state.picture_url} className="img-thumbnail img-fluid" style={{height: "100px"}}/>
                        <div className="pt-2 form-floating mb-3">
                        <select onChange={this.handleManuChange} value={this.state.manu} required id="Manufacturer" name = "manufacturer" className="form-select">
                        <option value="">Choose a Manufacturer.</option>
                        {this.state.manus.map(manu => {
                            return(
                            <option key={manu.id} value={manu.id}>
                            {manu.name}
                            </option>  
                        );
                      })}
                    </select>
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