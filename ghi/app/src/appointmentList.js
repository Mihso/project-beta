import React from 'react'

function getDate(props)
{
    let convert = new Date(props);
    return `${convert.getDate()}-${convert.getMonth()}-${convert.getFullYear()}`;
}

function getTime(props){
    let convert = new Date(props)
    return `${convert.getUTCHours()}:${convert.getUTCMinutes()}`
}

class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
        }
        this.deleteAppointment = this.deleteAppointment.bind(this);
    }
    async componentDidMount() {

        const appointmentsUrl = `http://localhost:8080/api/appointments/`
        
            const response = await fetch(appointmentsUrl)
            if (response.ok) {
                const data = await response.json();
                this.setState({appointments: data.appointments});
            }
    }

    async componentDidUpdate(){
        
        const appointmentsUrl = 'http://localhost:8080/api/appointments/';

        const appointmentsResponse = await fetch(appointmentsUrl);
        
        if (appointmentsResponse.ok) {
            const data = await appointmentsResponse.json();
            this.setState({appointments: data.appointments});
        }
    }

deleteAppointment(props){
    const technicianUrl = `http://localhost:8080/api/appointments/${props}/`
    const fetchConfig ={
        method: "delete",
        headers: {
            'Content-Type': 'application/json'
    }
    }
    const response = fetch(technicianUrl, fetchConfig)

    const appointmentsUrl = 'http://localhost:8080/api/appointments/';

    const appointmentsResponse = fetch(appointmentsUrl);
    
    if (appointmentsResponse.ok) {
        const data = appointmentsResponse.json();
        this.setState({appointments: data.appointments});
    } 

}

    render () {
        return (
            <>
                <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                    <img className="bg-white rounded shadow d-block mx-auto mb-4"  src="/logo.svg" alt="" width="600" />
                    <h1 className="display-5 fw-bold">Service Appointments</h1>
                    <div className="col-lg-6 mx-auto">
                    </div>
                </div>
                <div className="container">
                    <h2>Services</h2>
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
                        {this.state.appointments.map((appointment) => {
                            return (
                            <tr scope="row" key={appointment.id}>
                                <td><p>{appointment.auto.vin}</p></td>
                                <td><p>{appointment.owner}</p></td>
                                <td><p>{getDate(appointment.date)}</p></td>
                                <td><p>{getTime(appointment.date)}</p></td>
                                <td><p>{appointment.technician.name}</p></td>
                                <td><p>{appointment.reason}</p></td>
                                <td>
                                <button type="button" onClick={() => this.deleteAppointment(appointment.id)} className="btn btn-danger">Cancel</button>
                                </td>
                                <td>
                                <button type="button" onClick={()=> this.deleteAppointment(appointment.id)} className="btn btn-primary">Finished</button>
                                <div className="alert alert-success d-none mb-0" id="success-message">
                                    Appointment Completed 
                                </div>
                                </td>
                            </tr>
                        )
                        })}
                        </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default AppointmentList