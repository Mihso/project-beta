import React from 'react'


class ServiceForm extends React.Component {
constructor(props){
    super(props)
    this.state = {
        autos: [],
        owner: [],
        date: '',
        technicians: [],
        reason: '',
    
    }
    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleOwnerChange = this.handleOwnerChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTechnicianChange = this.handleTechnicianChange.bind(this)
    this.handleReasonChange = this.handleReasonChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

}

async handleSubmit(event){
    event.preventDefault()
    const data = {...this.state}
    delete data.technicians;
    delete data.autos;

    // const returningOwnerUrl = `http://localhost:8100/api/automobiles/${data.auto}`
    // const returningOwner = await fetch(returningOwnerUrl)
    // const autoDetails = await returningOwner.json()
    // autoDetails.returning = true
    // const fetchReturningConfig = {
    //     method: "post",
    //     body: JSON.stringify(autoDetails),
    //     headers: {
    //         'Content-Type': 'application/json'
    // }
    // }

    // const returningResponse = await fetch(returningOwnerUrl, fetchReturningConfig)
    // if (returningResponse.ok) {
    //     console.log("welcome back")
    // }

const serviceUrl = 'http://localhost:8080/api/appointments/'
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
        auto: '',
        owner: '',
        technician: '',
        date: '',
        reason: '',
    }
    this.setState(cleared)
}
const autoUrl = 'http://localhost:8100/api/automobiles'

const autoResponse = await fetch(autoUrl)

// if (autoResponse.ok) {
//     const data = await autoResponse.json()
//     const returningOwner = data.autos.filter(auto => {return auto.returning === false})
//     this.setState({autos: returningOwner})
// }


}
handleVinChange(event){
    const value = event.target.value
    this.setState({auto: value})
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

async componentDidMount(){
    const url = 'http://localhost:8080/api/technicianList/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
        this.setState({technicians: data.technician});
      }
    
      const autoUrl = 'http://localhost:8100/api/automobiles'
      const autoResponse = await fetch(autoUrl)
  
      if(autoResponse.ok)
      {
          const autoData = await autoResponse.json()
          this.setState({autos: autoData.autos})
      }
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
                        <select onChange={this.handleVinChange} value={this.state.auto} required id="vin" name = "vin" className="form-select">
                            <option value="">Choose a Vin.</option>
                            {this.state.autos.map(vin => {
                            return(
                                <option key={vin.vin} value={[vin.vin]}>
                                    {vin.vin}
                                </option>  
                            );
                        })}
                        </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleOwnerChange} value={this.state.owner} required placeholder="Owner" type="text" name="address" id="address" className="form-control" />
                            <label htmlFor="address">Owner</label>
                        </div>
                        <div className="form-floating mb-3">
                        <div>
                            <label htmlFor="appointment-time">Choose a time for your appointment:</label>
                        </div>
                            <input onChange={this.handleDateChange} type="datetime-local" id="appointment-time" name="appointment-time" value={this.state.date} min="2018-06-07T00:00" max="2022-06-14T00:00"/>
                        </div>
                        <div className="form-floating mb-3">
                        <select onChange={this.handleTechnicianChange} value={this.state.technician} required id="technician" name = "technician" className="form-select">
                            <option value="">Choose a technician</option>
                            {this.state.technicians.map(technician => {
                                return(
                                <option key={technician.employeeNumber} value={technician.employeeNumber}>
                                {technician.name}
                                </option>  
                            );
                            })}
                        </select>
                        {/*    <input onChange={this.handleTechnicianChange} value={this.state.technician} required placeholder='Technician' type="text" name="technician" id="technician" className="form-control"/>
                            <label htmlFor='technician'>Technician</label>
                        */}
                        </div>
                            <div className="form-floating mb-3">
                            <input onChange={this.handleReasonChange} value={this.state.reason} required placeholder='Reason' type="text" name="reason" id="reason" className="form-control"/>
                            <label htmlFor='reason'>Reason</label>
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