import React from 'react'

async function updater(props){
    const serviceUrl = `http://localhost:8080/api/service/`

    const serviceResponse = await fetch(serviceUrl)
    
    if (serviceResponse.ok) {
        const data = await serviceResponse.json()
        const after = data.services.filter(service => {
            return service.auto.vin == props.state.auto})
        props.setState({service: after})
        } 
    }

class ServiceHistoryForm extends React.Component {
constructor(props){
    super(props)
    this.state = {
        vin: "",
        services: [],
    }
    this.handleServiceChange = this.handleServiceChange.bind(this)
}

handleServiceChange(event){
    const value = event.target.value
    this.setState({vin: value})
    updater(this)
}

async componentDidMount(){
    const serviceUrl = 'http://localhost:8080/api/appointments/'
    const serviceResponse = await fetch(serviceUrl)

    if (serviceResponse.ok) {
        const data = await serviceResponse.json()
        console.log(data)
        const after = data.appointments.filter(service=> {return service.auto.vin = this.state.vin})
        this.setState({services: after})

    }
}

    render(){
    return(
    <>
    <div className="my-2 container">
        <div className="px-2 py-3 my-5 mt-0 rounded-pill text-center bg-success">
            <h1 className="display-5 fw-bold">Service History</h1>
            <div className="col-lg-6 mx-auto" />
        </div>
        <div className="row">
            <div className="col">
                <div className="card-shadow">
                <div className="card-body">
                    <div className="topnav">
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search VIN" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    </div>
                    </div>    
                </div>
            </div>
        </div>
    </div>
    <p> </p>
    <div className="row">
        <div className = "col">
            <div className="row gx-5 gy-3 rows-cols-3">
                <table className="center border border-5 border-success table">
                    <thead>
                        <tr>
                            <th scope="col">VIN</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Technician</th>
                            <th scope="col">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.services.map((service) => {
                            console.log(service.vin)
                            return (
                                <tr scope="row" key={service.id}>
                                    <td><p>{service.auto.vin}</p></td>
                                    <td><p>{service.owner}</p></td>
                                    <td><p>{service.date}</p></td>
                                    <td><p>{service.technician}</p></td>
                                    <td><p>{service.reason}</p></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>     
            </div>
        </div>
    </div>
    </>
    )
    }
}

export default ServiceHistoryForm