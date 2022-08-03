import React from 'react'

async function updater(props){
    const serviceUrl = `http://localhost:8080/api/services/`

    const serviceResponse = await fetch(serviceUrl)
    
    if (serviceResponse.ok) {
        const data = await serviceResponse.json()
        const after = data.services.filter(service => {
            console.log(service)
            return service.automobile.vin == props.state.automobile})
        props.setState({service: after})
        } 
    }

class ServiceHistoryForm extends React.Component {
constructor(props){
    super(props)
    this.state = {
        service: [],
        appointment: [],
    }
    this.handleServiceChange = this.handleServiceChange.bind(this)
    this.handleAppointmentChange = this.handleAppointmentChange.bind(this)
}

handleServiceChange(event){
    const value = event.target.value
    this.setState({service: value})
}
handleAppointmentChange(event){
    const value = event.target.value
    this.setState({appointment: value})
    updater(this)
}
async componentDidMount(){
    const appointmentsUrl = `http://localhost:8080/api/appointments/`

    const appointmentsResponse = await fetch(appointmentsUrl)

    if (appointmentsResponse.ok){
        const data = await appointmentsResponse.json()
            this.setState({appointments: data.appointment})
    }
    const servicesUrl = `http://localhost:8080/api/services/`
    
    const serviceResponse = await fetch(servicesUrl)

    if (serviceResponse.ok) {
        const data = await serviceResponse.json()
        const after = data.services.filter(sale => {return service.automobile.vin = this.state.automobile})
        this.setState({services: after})
    }
            
}
    render(){
    return (
    <><div className="my-5 container">
            <div className="row">
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="card-title">Service appointments</h1>
                            <p className="mb-3">
                                Submit an appointment.
                            </p>
                            <div className="mb-3">
                                <select onChange={this.handleAppointmentChange} value={this.state.appointment} required id="appointment" name="appointment" className="form-select">
                                    <input type="text" id="myInput" onKeyUp="myFunction()" placeholder='Search Using Vin'></input>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p>  </p>
        <div className='row'>
                <div className='col'>
                    <div className="row gx-5 gy-3 row-cols-3">
                        <table className="center table">
                            <thead>
                                <tr>
                                    <th scope="col">VIN</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Technician</th>
                                    <th scope="col">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.appointment.map((appointments) => {
                                    console.log(appointments.automobile.vin)
                                    return (
                                        <tr scope="row" key={appointments.id}>
                                            <td><p>{appointments.automobile.vin}</p></td>
                                            <td><p>{appointments.customer.name}</p></td>
                                            <td><p>{appointments.date}</p></td>
                                            <td><p>{appointments.time}</p></td>
                                            <td><p>{appointments.technician.name}</p></td>
                                            <td><p>{appointments.service.reason}</p></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div></>
        )
    }
}
export default ServiceHistoryForm