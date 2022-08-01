import React from 'react'
import { Link } from 'react-router-dom'

class VehicleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicles: [],
        }
    }
    async componentDidMount(){
        const vehicleUrl = `http://localhost:8100/api/models/`

        const response = await fetch(vehicleUrl)
        if (response.ok) {
            const data = await response.json()
            this.setState.apply({vehicles: data.vehicles})
        }
    }

    render() {
        return (
            <>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                <img className="bg-white rounded shadow d-block mx-auto mb-4" src='/logo.svg' alt="" width="600" />
                <h1 className= "displays-5 fw-bold">Vehicles</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Take a look at our Vehicles! You won't find a lemon here!
                    </p>
                </div>
            </div>
            <div className="container">
                <h2>Vehicles, Vehicles, and more Vehicles</h2>
                <div className="row gx-5 gy-3 row-cols-3">
                    <table className="center">
                        <tbody>
                            {this.state.vehicles.map((vehicle) => {
                                console.log(vehicle)
                            return (
                                <tr key={vehicle.id}>
                                <td><p>{vehicle.name}</p></td>
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

export default VehicleList