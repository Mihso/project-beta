import React from 'react'


class ServiceForm extends React.Component {
constructor(props){
    super(props)
    this.state = {
        vin: '',
        owner: [],
        date: '',
        time: '',
        technician: [],
        reason: '',
    
    }
    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleOwnerChange = this.handleOwnerChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleTechnicianChange = this.handleTechnicianChange.bind(this)
    this.handleReasonChange = this.handleReasonChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

}

async handleSubmit(event){
    event.preventDefault()
    const data = {...this.state}

    const returningOwnerUrl = `http://localhost:8100/api/automobiles/${data.auto}`
    const returningOwner = await fetch(returningOwnerUrl)
    const autoDetails = await returningOwner.json()
    autoDetails.returning = true
    const fetchReturningConfig = {
        method: "post",
        body: JSON.stringify(autoDetails),
        headers: {
            'Content-Type': 'application/json'
    }
    }

    const returningResponse = await fetch(returningOwnerUrl, fetchReturningConfig)
    if (returningResponse.ok) {
        console.log("welcome back")
    }

const serviceUrl = 'http://localhost:8080/api/service/'
const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
}
}
const response = await fetch(serviceUrl, fetchConfig)
if (response.ok) {
    const cleared ={
        vin: '',
        owner: '',
        technician: '',
        date: '',
        time: '',
        reason: '',
    }
    this.setState(cleared)
}
const autoUrl = 'http://localhost:8100/api/automobiles'

const autoResponse = await fetch(autoUrl)

if (autoResponse.ok) {
    const data = await autoResponse.json()
    const returningOwner = data.autos.filter(auto => {return auto.returning === false})
    this.setState({autos: returningOwner})
}


}
handleVinChange(event){
    const value = event.target.value
    this.setState({vin: value})
}
handleOwnerChange(event){
    const value = event.target.value
    this.setState({owner: value})
}
handleDateChange(event){
    const value = event.target.value
    console.log(value)
    this.setState({date: value})
}
handleTimeChange(event){
    const value = event.target.value
    this.setState({time: value})
}
handleTechnicianChange(event){
    const value = event.target.value
    this.setState({technician: value})
}
handleReasonChange(event){
    const value = event.target.value
    this.setState({reason: value})
}


    
        render(){
        return(
        <div className="my-5 container">
            <div className="row">
            <div className="col">
                <div className="card shadow">
                <div className="card-body">
                <form onSubmit={this.handleSubmit} id="create-customer-form">
                    <h1 className='card-title'>Add a Service</h1>
                    <p className='mb-3'>
                    </p>
                    <div className="mb-3">
                        </div>
                        <div className = 'row'>
                            <div className = 'col'>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleVinChange} value={this.state.vin} required placeholder="Vin" type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleOwnerChange} value={this.state.owner} required placeholder="Owner" type="text" name="address" id="address" className="form-control" />
                            <label htmlFor="address">Owner</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(ev) => {this.setState({date:ev.target.value})}} type="date" required placeholder="Date" name="date-brought-in" id="brought-in" min="2022-08-01" max="3000-12-31 "className="form-control" />
                            <label htmlFor="date">Date Brought in</label>
                        <div className="form-floating mb-3">
                            <input onChange={(ev) => {this.setState({time:ev.target.value})}} required placeholder='Time' type="time" step="1" value={this.state.time} name="time-brought-in" id="time-brought-in" className="form-control" />
                            <label htmlFor="time">Time Brought In</label>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleTechnicianChange} value={this.state.technician} required placeholder='Technician' type="text" name="technician" id="technician" className="form-control"/>
                            <label htmlFor='technician'>Technician</label>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleReasonChange} value={this.state.reason} required placeholder='Reason' type="text" name="reason" id="reason" className="form-control"/>
                            <label htmlFor='reason'>Reason</label>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form> 
                    <div className="alert alert-success d-none mb-0" id="success-message">
                    Successfully Created Service Form
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
            )
        }        
}


export default ServiceForm