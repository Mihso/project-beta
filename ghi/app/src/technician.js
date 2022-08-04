import React from 'react'

class TechnicianForm extends React.Component {
constructor(props){
    super(props)
    this.state={
        name: '',
        employeeNumber: '',
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

}

async handleSubmit(event){
    event.preventDefault()
    const data = {...this.state}
    delete data.models

    const technicianUrl = 'http://localhost:8080/api/technician/'
    const fetchConfig ={
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
    }
    }
    const response = await fetch(technicianUrl, fetchConfig)
    if (response.ok){
        const cleared = {
            name: '',
            employeeNumber: ''
        }
        this.setState(cleared)
    }

}

handleNameChange(event){
    const value = event.target.value
    this.setState({name: value})

}
handleNumberChange(event){
    const value = event.target.value
    this.setState({employeeNumber: value})
}

async componentDidMount(){

}

render(){
return(
<div className="my-2 container">
    <div className="px-2 py-3 my-5 mt-0 rounded-pill text-center bg-success">
        <h1 className="display-5 fw-bold">Find a technician</h1>
        <div className="col-lg-6 mx-auto" />
    </div>
    <div className="row">
    <div className="col">
        <div className="card shadow">
        <div className="card-body">
        <form onSubmit={this.handleSubmit} id="create-technician-form">
            <p className='mb-3'>
                Input their information.
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
                <input onChange={this.handleNumberChange} value={this.state.employeeNumber} required placeholder="Number" type="text" name="employee-number" id="number" className="form-control" />
                <label htmlFor="number">Employee Number</label>
                </div>
                </div>
                </div>
                <button className="btn btn-success">Create</button>
            </form> 
            <div className="alert alert-success d-none mb-0" id="success-message">
            Successfully found a technician
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
);
}
}


export default TechnicianForm