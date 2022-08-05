import React from 'react'

class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],

        }
    }
    async componentDidMount() {

        const appointmentsUrl = `http://localhost:8080/api/appointments/`
        
            const response = await fetch(appointmentsUrl)
            if (response.ok) {
                const data = await response.json()
                this.setState({appointments: data.appointments})
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
                            <td><p>{appointment.date}</p></td>
                            <td><p>{appointment.time}</p></td>
                            <td><p>{appointment.technician.name}</p></td>
                            <td><p>{appointment.reason}</p></td>
                            <td>
                            <button className="btn btn-primary">Finished</button>
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