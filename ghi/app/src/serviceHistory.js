import React from 'react'

async function updater(props){
    const serviceUrl = `http://localhost:8080/api/appointments/`

    const serviceResponse = await fetch(serviceUrl)
    

    if (serviceResponse.ok) {
        const data = await serviceResponse.json()
        const after = data.appointments.filter(service=> {return service.auto.vin == props.state.vin})
        props.setState({services: after})

    }
    }

class ServiceHistoryForm extends React.Component {
constructor(props){
    super(props)
    this.state = {
        vins: [],
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
    const autoUrl = 'http://localhost:8100/api/automobiles'
    const autoResponse = await fetch(autoUrl)

    if(autoResponse.ok)
    {
        const autoData = await autoResponse.json()
        this.setState({vins: autoData.autos})
    }
    const serviceUrl = 'http://localhost:8080/api/appointments/'
    const serviceResponse = await fetch(serviceUrl)


    if (serviceResponse.ok) {
        const data = await serviceResponse.json()
        const after = data.appointments.filter((service) => {return service.auto.vin == this.state.vin})
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
                    <div className="mb-3">
                        <select onChange={this.handleServiceChange} value={this.state.vin} required id="vin" name = "vin" className="form-select">
                            <option value="">Choose a Vin.</option>
                            {this.state.vins.map(vin => {
                            return(
                                <option key={vin.vin} value={[vin.vin]}>
                                    {vin.vin}
                                </option>  
                            );
                        })}
                        </select>
                    </div>
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
                            return (
                                <tr scope="row" key={service.id}>
                                    <td><p>{service.auto.vin}</p></td>
                                    <td><p>{service.owner}</p></td>
                                    <td><p>{service.date}</p></td>
                                    <td><p>{service.technician.name}</p></td>
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