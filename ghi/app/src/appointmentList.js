import React from 'react'

class appointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],

        }
    }
    async componentDidMount() {

        const appointmentsUrl = `http://localhost:8080/api/services/`
        
            const response = await fetch(serviceUrl)
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
                        </table>
                        <tbody>
                        {this.state.service.map((service) => {
                            return (
                                <tr scope="row" key={service.id}>
                                <td><p>{service.auto.vin}</p></td>
                                <td><p>{service.owner}</p></td>
                                <td><p>{service.date}</p></td>
                                <td><p>{service.time}</p></td>
                                <td><p>{service.technician.name}</p></td>
                                <td><p>{service.reason}</p></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </div>
                </div>
            </>
        )
    }



}

export default appointmentList